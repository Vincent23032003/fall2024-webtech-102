"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import { UUID } from "crypto";
import { User } from "@supabase/supabase-js"; // Import du type User

type Article = {
  id: number;
  title: string;
  description: string;
  authorid: UUID;
  likes: number;
  comments: UUID;
  created_date: string;
  users: {
    username: string;
  };
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Utilisation explicite de User | null
  const router = useRouter();

  // Vérifier l'utilisateur connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error.message);
        setUser(null);
      } else {
        setUser(user); // Assigner l'utilisateur si connecté
      }
    };

    checkUser();
  }, []);

  // Récupérer les articles
  useEffect(() => {
    const fetchArticles = async () => {
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
          .order("created_date", { ascending: false });

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

  // Fonction pour rediriger vers la page "Écrire un article"
  const handleWriteArticle = () => {
    router.push("/blog/new"); // Redirection vers la page client/app/blog/new/page.tsx
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
        {/* Bouton "Écrire un article" */}
        {user ? (
          <button
            onClick={handleWriteArticle}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Écrire un article
          </button>
        ) : (
          <p className="text-sm text-gray-500">Connectez-vous pour écrire un article.</p>
        )}
      </div>

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
                Publié le {new Date(article.created_date).toLocaleDateString()} par{" "}
                {article.users?.username || "Auteur inconnu"}
              </p>
              <p className="mt-4 text-gray-700">{article.description.slice(0, 150)}...</p>
              <div className="mt-6 flex items-center space-x-4">
                <button className="text-blue-500 hover:underline">Commenter</button>
                <button className="text-gray-500 hover:text-red-500">
                  {article.likes} J'aime
                </button>
                <button
                  onClick={() => router.push(`/articles/${article.id}`)}
                  className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Lire l'article
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
