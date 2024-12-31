"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../supabaseClient";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params); // Unwrap the promise
  const articleId = resolvedParams.id; // Correct usage
  const [article, setArticle] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch the article to edit
  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", articleId)
        .single();

      if (error) {
        console.error("Error fetching article:", error.message);
      } else {
        setArticle(data);
        setTitle(data.title);
        setDescription(data.description);
      }

      setLoading(false);
    };

    fetchArticle();
  }, [articleId]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("articles")
      .update({ title, description })
      .eq("id", articleId);

    if (error) {
      console.error("Error updating article:", error.message);
    } else {
      router.push("/blog");
    }
  };

  if (loading) {
    return <p className="h-screen text center text-2xl text-white">Loading...</p>;
  }

  return (
    <div className="h-screen max-w-3xl mx-auto p-6">
      <h1 className="text-4xl text-white font-bold mb-4">Edit your article</h1>
      <div className="mb-4">
        <label className="block mb-1 text-white">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={6}
        />
      </div>
      <button
        onClick={handleUpdate}
        className="w-3/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
      >
        Update Article
      </button>
    </div>
  );
}
