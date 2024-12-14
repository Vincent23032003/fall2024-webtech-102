"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Vérifier l'utilisateur connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
  
      if (user) {
        // L'utilisateur est connecté
        setUser(user);
      } else {
        // Aucun utilisateur connecté
        setUser(null);
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
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white">Blog</h1>
        {/* Bouton "Écrire un article" */}
        <span className="relative">
        {user ? (
          <button
          onClick={handleWriteArticle}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          className="text-white px-4 hover:animate-rotate-y"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-11">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        ) : (
          <p className="text-sm text-gray-500">Connectez-vous pour écrire un article.</p>
        )}
        {isTooltipVisible && (
          <div
          role="tooltip"
          className="absolute z-10 left-auto px-3 py-2 text-sm font-medium text-yellow-400 bg-blue-900 rounded-lg "
          >
            Write a new article !
            <div className="absolute w-2 h-2 bg-blue-900 transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
          </div>
        )}
        </span>
      </div>

      {loading ? (
        <p className="text-white text-lg">Loading...</p>
      ) : articles.length === 0 ? (
        <p>Aucun article disponible pour le moment.</p>
      ) : (
        <div className="space-y-8">
          {articles.map((article) => (
            <div key={article.id} className="p-6 bg-white shadow-md rounded-lg animate-fade-up">
              <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
              <p className="text-sm text-gray-500">
                Publié le {new Date(article.created_date).toLocaleDateString()} par{" "}
                {article.users?.username || "Auteur inconnu"}
              </p>
              <p className="mt-4 text-gray-700">{article.description.slice(0, 150)}...</p>
              <div className="mt-6 flex items-center space-x-4">
                <button className="flex inline-block text-red-600">
                  {article.likes}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
                <button
                  onClick={() => router.push(`/articles/${article.id}`)}
                  className="w-2/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
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
