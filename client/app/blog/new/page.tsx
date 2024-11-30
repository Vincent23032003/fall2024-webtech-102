"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import { User } from "@supabase/supabase-js";

export default function NewArticlePage() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Vérifier l'utilisateur connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error.message);
        setUser(null);
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, []);

  // Fonction pour créer un nouvel article
  const handleCreateArticle = async () => {
    if (!title || !description) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (!user) {
        throw new Error("Utilisateur non connecté.");
      }

      const createdDate = new Date().toISOString(); // Générer la date actuelle au format ISO

      const { data, error } = await supabase
        .from("articles")
        .insert({
          title,
          description,
          authorid: user.id,
          created_date: createdDate,
          likes: 0, // Initialiser les likes à 0
          comments: [], // Initialiser les commentaires comme un tableau vide
        })
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        // Rediriger l'utilisateur vers la page du blog après la création
        router.push("/blog");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erreur lors de la création de l'article.");
      } else {
        setError("Une erreur inattendue s'est produite.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-12">
        Vous devez être connecté pour écrire un article.
      </p>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Créer un nouvel article</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateArticle();
        }}
        className="space-y-6"
      >
        {/* Champ pour le titre */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre de votre article"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Champ pour la description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Rédigez la description de votre article"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Message d'erreur */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Bouton de création */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Publication en cours..." : "Publier l'article"}
          </button>
        </div>
      </form>
    </main>
  );
}
