"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import { User } from "@supabase/supabase-js";
import WysiwygEditor from "../../../components/WysiwygEditor"

export default function NewArticlePage() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [textSizeDropdownVisible, setTextSizeDropdownVisible] = useState(false);


  const handleToggleTextSize = () => {
    setTextSizeDropdownVisible(!textSizeDropdownVisible);
  };

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
    <main className="max-w-4xl mx-auto h-screen">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white">Create a new article</h2>
      <WysiwygEditor />
    </main>
  );
}
