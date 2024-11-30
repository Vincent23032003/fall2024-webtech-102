"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import { UUID } from "crypto";

type Article = {
  id: UUID;
  title: string;
  authorid: UUID;
  description: string;
  likes: number;
  comments: UUID[];
  created_date: string;
  users: {
    username: string;
  };
};

type Comment = {
  id: UUID;
  content: string;
  articleid: UUID;
  authorid: UUID;
  created_date: string;
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
            authorid: data.authorid // Utiliser data.author_id qui est de type UUID
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
        .select("*")
        .eq("articleid", articleId)
        .order("created_date", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data || []);
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
    return <p>Loading article...</p>;
  }

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
      <p className="text-sm text-gray-500">
        Published on {new Date(article.created_date).toLocaleDateString()} by{" "}
        {article.users?.username || "Unknown Author"}
      </p>
      <div className="mt-6 text-gray-700">{article.description}</div>

      {/* Comments section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b py-2">
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">
                Published on {new Date(article.created_date).toLocaleDateString()} by{" "}
                {article.users?.username || "Unknown Author"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Add comment button */}
        <button
          onClick={() => setShowCommentForm(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Comment
        </button>

        {/* Comment form */}
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
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Comment
            </button>
          </div>
        )}
      </section>
    </main>
  );
}