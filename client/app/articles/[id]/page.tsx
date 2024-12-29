"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";

type Article = {
  id: string;
  title: string;
  authorid: string;
  description: string;
  likes: number;
  comments: string[];
  created_date: string;
  users: {
    username: string;
  };
};

type Comment = {
  id: string;
  content: string;
  articleid: string;
  authorid: string;
  created_date: string;
  users: {
    username: string;
  };
};

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const articleId = resolvedParams.id;
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState<boolean>(false); // Vérifier si l'utilisateur a déjà liké l'article
  const [user, setUser] = useState<any>(null); // Stocker l'utilisateur connecté
  const router = useRouter();

  // Vérifier si un utilisateur est connecté
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setUser(null); // Aucun utilisateur connecté
      } else {
        setUser(user); // Utilisateur connecté
      }
    };
    fetchUser();
  }, []);


  // Fetch article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select(`
            id,
            title,
            description,
            authorid,
            likes,
            comments,
            created_date,
            users (username)
          `)
          .eq("id", articleId)
          .single();

        if (error) {
          console.error("Error fetching article:", error);
        } else if (data) {
          const user = Array.isArray(data.users) ? data.users[0] : data.users;
          const transformedArticle: Article = {
            ...data,
            users: {
              username: user?.username || "Unknown Author",
            },
            authorid: data.authorid,
          };
          setArticle(transformedArticle);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          id,
          content,
          articleid,
          authorid,
          created_date,
          users (username)
        `)
        .eq("articleid", articleId)
        .order("created_date", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      if (data) {
        const transformedComments: Comment[] = data.map((comment) => {
          const user = Array.isArray(comment.users) ? comment.users[0] : comment.users;
          return {
            ...comment,
            users: { username: user?.username || "Unknown Author" },
          };
        });

        setComments(transformedComments);
      }
    };

    fetchComments();
  }, [articleId]);

  // Vérifier si l'utilisateur a déjà liké l'article
  useEffect(() => {
    const checkIfUserLiked = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setHasLiked(false);
        return;
      }

      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("articleid", articleId)
        .eq("authorid", user.id)
        .single();

      if (data) {
        setHasLiked(true); // Si un like existe, on marque l'utilisateur comme ayant liké
      } else {
        setHasLiked(false); // Si aucun like n'est trouvé, l'utilisateur peut liker
      }
    };

    checkIfUserLiked();
  }, [articleId]);

  const handleAddComment = async () => {
    setError(null);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be logged in to add a comment.");
      }

      const authorId = user.id;

      const { data, error } = await supabase
        .from("comments")
        .insert({
          content: newComment,
          articleid: articleId,
          authorid: authorId,
        })
        .select();

      if (error) {
        throw error;
      }

      setComments((prev) => [...prev, data[0]]);
      setNewComment("");
      setShowCommentForm(false);
    } catch (err: any) {
      setError(err.message || "Error adding comment.");
    }
  };

  // Fonction pour liker l'article
  const handleLikeArticle = async () => {
    if (!user) {
      setError("You must be logged in to like the article."); // Message d'erreur si non connecté
      console.log("User not authenticated.");
      return;
    }
  
    if (!article) {
      setError("Article not found."); // Message d'erreur si l'article est null
      console.log("Article is null.");
      return;
    }
  
    setError(null);
  
    try {
      // Vérifier si l'utilisateur a déjà liké l'article
      if (hasLiked) {
        console.log("Removing like...");
        
        // Supprimer le like de la table "likes"
        const { error: unlikeError } = await supabase
          .from("likes")
          .delete()
          .eq("articleid", articleId)
          .eq("authorid", user.id);
  
        if (unlikeError) {
          console.log("Error removing like", unlikeError);
          throw unlikeError;
        }
  
        // Décrémenter le compteur de likes dans la table "articles"
        const { data, error } = await supabase
          .from("articles")
          .update({ likes: article.likes - 1 })
          .eq("id", articleId)
          .select();
  
        if (error) {
          console.log("Error updating article likes", error);
          throw error;
        }
  
        // Mettre à jour l'état local
        if (data && data[0]) {
          setArticle((prevArticle) =>
            prevArticle ? { ...prevArticle, likes: data[0].likes } : null
          );
          setHasLiked(false); // L'utilisateur peut à nouveau liker
          console.log("Like removed successfully.");
        }
      } else {
        console.log("Adding like...");
  
        // Ajouter un like dans la table "likes"
        const { error: likeError } = await supabase.from("likes").insert({
          articleid: articleId,
          authorid: user.id,
        });
  
        if (likeError) {
          console.log("Error inserting like", likeError);
          throw likeError;
        }
  
        // Incrémenter le compteur de likes dans la table "articles"
        const { data, error } = await supabase
          .from("articles")
          .update({ likes: article.likes + 1 })
          .eq("id", articleId)
          .select();
  
        if (error) {
          console.log("Error updating article likes", error);
          throw error;
        }
  
        // Mettre à jour l'état local
        if (data && data[0]) {
          setArticle((prevArticle) =>
            prevArticle ? { ...prevArticle, likes: data[0].likes } : null
          );
          setHasLiked(true); // L'utilisateur a liké
          console.log("Like added successfully.");
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error liking/unliking article.");
        console.log("Error liking/unliking article", err.message);
      } else {
        setError("An unexpected error occurred.");
        console.log("Unexpected error", err);
      }
    }
  };
  
  
  

  if (loading) {
    return <p className="text-center text-gray-500">Loading article...</p>;
  }

  if (!article) {
    return <p className="text-center text-gray-500">Article not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 h-screen">
      {/* Article Section */}
      <section className="bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-semibold text-gray-900">{article.title}</h1>
        <p className="text-sm text-gray-700 mt-2">
          Published on {new Date(article.created_date).toLocaleDateString()} by{" "}
          {article.users?.username || "Unknown Author"}
        </p>
        <div className="mt-6 text-black">{article.description}</div>

        {/* Like Button with Counter */}
      <div className="flex items-center mt-4 space-x-2">
        <button
          onClick={handleLikeArticle}
          className={`text-red-600 flex items-center ${
            !user ? "cursor-not-allowed opacity-50" : "" // Grisé si pas connecté
          }`}
          disabled={!user} // Désactiver si pas connecté
        >
          <span>{article.likes}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={hasLiked ? "red" : "none"} // Remplir l'icône si l'article est liké
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        {!user && (
          <p className="text-sm text-gray-500">
            You must be logged in to like the article.
          </p>
        )}
      </div>



          {/* Comments Section */}
      <h2 className="text-2xl mt-10 font-semibold">Comments</h2>
      <div className="mt-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-500 py-2">
              <p className="text-black">{comment.content}</p>
              <p className="text-sm text-gray-700">
                Published on {new Date(comment.created_date).toLocaleDateString()} by{" "}
                {comment.users?.username || "Unknown Author"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-black">No comments yet.</p>
        )}
      </div>

      {/* Add Comment Button */}
    <div className="flex items-center mt-4 space-x-4">
      <button
        onClick={() => user && setShowCommentForm(true)}
        className={`w-3/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg ${
          !user ? "cursor-not-allowed opacity-50" : "hover:text-yellow-400 border hover:border-yellow-400 border-2"
        }`}
        disabled={!user} // Désactiver si pas connecté
      >
        Add Comment
      </button>
      
      {/* Back to Blog Page Button */}
      <button
        onClick={() => router.push("/blog")} // Redirige vers la page blog
        className="w-3/12 h-1/12 bg-gray-800 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
      >
        Back to Blog Page
      </button>

      {!user && (
        <button
          onClick={() => router.push("/connexion")} // Redirige vers la page de connexion
          className="w-3/12 h-1/12 bg-gray-800 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
        >
          Sign In
        </button>
      )}

    </div>
    {!user && (
      <p className="text-sm text-gray-500 mt-2">You must be logged in to add a comment.</p>
    )}


        {showCommentForm && (
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded p-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleAddComment}
              className="w-3/12 h-1/12 mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
            >
              Save Comment
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
