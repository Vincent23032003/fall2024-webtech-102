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
  const resolvedParams = use(params); // Déballer params ici
  const articleId = resolvedParams.id; // Accéder à articleId après avoir déballé params
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          <button className="text-red-500 hover:text-red-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21l-6-5 2-7-5-6 7-1L12 2l3 6 7 1-5 6 2 7-6 5z"
              />
            </svg>
            <span>{article.likes} Likes</span>
          </button>
        </div>
      </section>

      {/* Comments Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>

        <div className="mt-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4">
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

        {/* Add Comment Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowCommentForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add a Comment
          </button>
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
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
