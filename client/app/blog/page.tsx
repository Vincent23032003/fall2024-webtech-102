"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

type Article = {
  id: number;
  title: string;
  description: string;
  author: string;
  like: number;
  comment: any[];
  create_date: string;
  users: {
    username: string;
  };
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select(`
            id,
            title,
            description,
            author,
            like,
            comment,
            create_date,
            users (username)
          `)
          .order("create_date", { ascending: false });

        if (error) {
          console.error("Erreur lors de la récupération des articles :", error.message);
        } else if (data && Array.isArray(data)) {
          setArticles(data as unknown as Article[]);
        } else {
          console.warn("Les données reçues ne correspondent pas à la structure attendue.");
        }
      } catch (error) {
        console.error("Erreur inattendue lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog</h1>
      {loading ? (
        <p>Chargement des articles...</p>
      ) : articles.length === 0 ? (
        <p>Aucun article disponible pour le moment.</p>
      ) : (
        <div className="space-y-8">
          {articles.map((article) => (
            <div key={article.id} className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
              <p className="text-sm text-gray-500">
                Publié le {new Date(article.create_date).toLocaleDateString()} par{" "}
                {article.users?.username || "Auteur inconnu"}
              </p>
              <p className="mt-4 text-gray-700">{article.description.slice(0, 150)}...</p>
              <div className="mt-6 flex items-center space-x-4">
                <button className="text-blue-500 hover:underline">Commenter</button>
                <button className="text-gray-500 hover:text-red-500">
                  {article.like} J'aime
                </button>
                <button
                  onClick={() => router.push(`/article/${article.id}`)}
                  className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Read the article
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
