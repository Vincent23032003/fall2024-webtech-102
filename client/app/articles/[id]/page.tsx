"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";

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

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // Résolution de la promesse
  const articleId = parseInt(resolvedParams.id, 10); // Extraction et conversion de l'ID
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return; // Vérifie que l'id est disponible
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
          .eq("id", articleId) // Filtre par ID
          .single(); // Récupère un seul article

        if (error) {
          console.error("Erreur lors de la récupération de l'article :", error);
        } else if (data) {
          // Vérifier si users est un tableau ou un objet
          const user = Array.isArray(data.users) ? data.users[0] : data.users;

          const transformedArticle: Article = {
            ...data,
            users: {
              username: user?.username || "Auteur inconnu",
            },
          };

          setArticle(transformedArticle);
        }
      } catch (error) {
        console.error("Erreur inattendue :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return <p>Chargement de l'article...</p>;
  }

  if (!article) {
    return <p>Article introuvable.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
      <p className="text-sm text-gray-500">
        Publié le {new Date(article.create_date).toLocaleDateString()} par{" "}
        {article.users.username || "Auteur inconnu"}
      </p>
      <div className="mt-6 text-gray-700">{article.description}</div>
      <div className="mt-6 flex items-center space-x-4">
        <button className="text-gray-500 hover:text-red-500">
          {article.like} J'aime
        </button>
        <button className="text-blue-500 hover:underline">Commenter</button>
      </div>
    </main>
  );
}
