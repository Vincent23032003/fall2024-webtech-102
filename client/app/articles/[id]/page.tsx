"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useRouter } from "next/navigation";

export default function ArticlePage({ params }: { params: { id: string } }) {
  // Convertir l'ID en entier
  const articleId = parseInt(params.id, 10);

  // Si l'ID n'est pas valide, afficher une erreur
  if (isNaN(articleId)) {
    return <div>Article non trouvé</div>;
  }

  const [article, setArticle] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", articleId) // Utilisation de l'ID comme entier
        .single(); // Nous nous attendons à un seul article

      if (error) {
        setError("Erreur lors de la récupération de l'article");
        console.error("Erreur lors de la récupération de l'article :", error.message);
      } else {
        setArticle(data);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Chargement de l'article...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
      <p className="text-sm text-gray-600">Publié le {article.create_date}</p>
      <div className="mt-4 text-gray-800">{article.description}</div>

      {/* Ajouter des boutons comme "J'aime" et "Commenter" */}
      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          J'aime ({article.like || 0})
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Commenter
        </button>
      </div>

      {/* Bouton "Read the article" */}
      <div className="mt-4">
        <button
          onClick={() => window.location.href = `/article/${article.id}`}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Lire l'article
        </button>
      </div>
    </div>
  );
}
