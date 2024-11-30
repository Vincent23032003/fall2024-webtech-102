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
  const router = useRouter();

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
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Unauthenticated user.");
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
    console.log("Trying to like article...");
    setError(null);
  
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.log("User not authenticated.");
        throw new Error("Unauthenticated user.");
      }
      console.log("User is authenticated", user);
  
      // Vérifier si l'article existe avant de procéder à l'incrémentation
      if (!article) {
        console.log("Article not found.");
        throw new Error("Article not found.");
      }
  
      if (hasLiked) {
        console.log("User has already liked this article.");
        throw new Error("You have already liked this article.");
      }
  
      const { error: likeError } = await supabase.from("likes").insert({
        articleid: articleId,
        authorid: user.id,
      });
  
      if (likeError) {
        console.log("Error inserting like", likeError);
        throw likeError;
      }
  
      const { data, error } = await supabase
        .from("articles")
        .update({ likes: article.likes + 1 })
        .eq("id", articleId)
        .select();
  
      if (error) {
        console.log("Error updating article likes", error);
        throw error;
      }
  
      if (data && data[0]) {
        setArticle(prevArticle => prevArticle ? { ...prevArticle, likes: data[0].likes } : null);
        setHasLiked(true);
        console.log("Like successful", data[0].likes);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error liking article.");
        console.log("Error liking article", err.message);
      } else {
        // Si l'erreur n'est pas une instance de Error
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
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Article Section */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-semibold text-gray-900">{article.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          Published on {new Date(article.created_date).toLocaleDateString()} by{" "}
          {article.users?.username || "Unknown Author"}
        </p>
        <div className="mt-6 text-gray-700">{article.description}</div>

        {/* Like Button with Counter */}
        <div className="flex items-center mt-4 space-x-2">
          <button
            onClick={handleLikeArticle}
            className={`text-red-500 hover:text-red-600 flex items-center ${hasLiked ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={hasLiked} // Désactiver le bouton si l'utilisateur a déjà liké
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <span>{article.likes}</span> Likes
          </button>
        </div>
      </section>

      {/* Comments Section */}
      <section>
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b py-2">
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">
                  Published on {new Date(comment.created_date).toLocaleDateString()} by{" "}
                  {comment.users?.username || "Unknown Author"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Comment Form */}
        <button
          onClick={() => setShowCommentForm(true)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Comment
        </button>

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
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Comment
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
