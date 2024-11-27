"use client";

import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;

      if (!user) {
        alert("Vous devez être connecté pour créer un article.");
        return;
      }

      const { data, error } = await supabase
        .from("articles")
        .insert({
          title,
          description,
          author: user.id,
        });

      if (error) {
        console.error("Erreur lors de la création de l'article :", error.message);
        alert("Erreur lors de la création de l'article.");
      } else {
        alert("Article créé avec succès !");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Créer un nouvel article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Contenu
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Publication en cours..." : "Publier l'article"}
        </button>
      </form>
    </main>
  );
}
