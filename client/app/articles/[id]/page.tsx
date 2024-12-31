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
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setUser(null);
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, []);



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
        setHasLiked(true);
      } else {
        setHasLiked(false);
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


  const handleLikeArticle = async () => {
    if (!user) {
      setError("You must be logged in to like the article.");
      console.log("User not authenticated.");
      return;
    }

    if (!article) {
      setError("Article not found.");
      console.log("Article is null.");
      return;
    }

    setError(null);

    try {
      if (hasLiked) {
        console.log("Removing like...");

        const { error: unlikeError } = await supabase
          .from("likes")
          .delete()
          .eq("articleid", articleId)
          .eq("authorid", user.id);

        if (unlikeError) {
          console.log("Error removing like", unlikeError);
          throw unlikeError;
        }


        const { data, error } = await supabase
          .from("articles")
          .update({ likes: article.likes - 1 })
          .eq("id", articleId)
          .select();

        if (error) {
          console.log("Error updating article likes", error);
          throw error;
        }


        if (data && data[0]) {
          setArticle((prevArticle) =>
            prevArticle ? { ...prevArticle, likes: data[0].likes } : null
          );
          setHasLiked(false);
          console.log("Like removed successfully.");
        }
      } else {
        console.log("Adding like...");


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
          setArticle((prevArticle) =>
            prevArticle ? { ...prevArticle, likes: data[0].likes } : null
          );
          setHasLiked(true);
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


  const handleDeleteComment = async (commentId: string) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("You must be logged in to delete a comment.");
        return;
      }

      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)
        .eq("authorid", user.id);

      if (error) {
        console.error("Error deleting comment:", error.message);
        alert("Failed to delete the comment.");
        return;
      }

      setComments((prevComments) => prevComments.filter((c) => c.id !== commentId));
      alert("Comment deleted successfully!");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };




  if (loading) {
    return <p className="h-screen text-center text-white">Loading article...</p>;
  }

  if (!article) {
    return <p className="text-center text-gray-500">Article not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 h-screen">

      <section className="bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-semibold text-gray-900">{article.title}</h1>
        <p className="text-sm text-gray-700 mt-2">
          Published on {new Date(article.created_date).toLocaleDateString()} by{" "}
          {article.users?.username || "Unknown Author"}
        </p>
        <div className="mt-6 text-black">{article.description}</div>


        <div className="flex items-center mt-4 space-x-2">
          <button
            onClick={handleLikeArticle}
            className={`text-red-600 flex items-center ${!user ? "cursor-not-allowed opacity-50" : ""
              }`}
            disabled={!user}
          >
            <span>{article.likes}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={hasLiked ? "red" : "none"}
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
        <h2 className="text-2xl mt-10 font-semibold">Comments</h2>
        <div className="mt-2">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-500 py-2 flex justify-between items-center">
                <div>
                  <p className="text-black">{comment.content}</p>
                  <p className="text-sm text-gray-700">
                    Published on {new Date(comment.created_date).toLocaleDateString()} by{" "}
                    {comment.users?.username || "Unknown Author"}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={comment.authorid !== user?.id}
                  className={`text-gray-500 hover:text-red-600 ${comment.authorid !== user?.id ? "cursor-not-allowed opacity-50" : ""
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 6.75L4.5 6.75M8.625 6.75V5.25C8.625 4.42157 9.29657 3.75 10.125 3.75H13.875C14.7034 3.75 15.375 4.42157 15.375 5.25V6.75M18 6.75V18.75C18 19.5784 17.3284 20.25 16.5 20.25H7.5C6.67157 20.25 6 19.5784 6 18.75V6.75H18Z"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-black">No comments yet.</p>
          )}
        </div>



        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={() => user && setShowCommentForm(true)}
            className={`w-3/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg ${!user || showCommentForm
              ? "cursor-not-allowed opacity-50"
              : "hover:text-yellow-400 border hover:border-yellow-400 border-2"
              }`}
            disabled={!user || showCommentForm}
          >
            Add Comment
          </button>


          <button
            onClick={() => router.push("/blog")}
            className={`w-3/12 h-1/12 bg-red-800 text-white px-4 py-2 rounded-lg ${showCommentForm
              ? "cursor-not-allowed opacity-50"
              : "hover:text-yellow-400 border hover:border-yellow-400 border-2"
              }`}
            disabled={showCommentForm}
          >
            Back to Blog Page
          </button>

          {!user && (
            <button
              onClick={() => router.push("/connexion")}
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
          <div className="mt-4 space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded p-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center space-x-4">

              <button
                onClick={handleAddComment}
                className="w-3/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
              >
                Save Comment
              </button>


              <button
                onClick={() => {
                  setShowCommentForm(false);
                  setNewComment("");
                }}
                className="w-3/12 h-1/12 bg-red-800 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>

              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
