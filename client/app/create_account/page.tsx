"use client";

import React from 'react';
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import bcrypt from "bcryptjs";
import { useRouter } from 'next/navigation';

const CreateAccountPage = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Empêche les clics multiples

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      setError(null);
      setSuccess(false);

      // Validation de l'email et du mot de passe
      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
        return;
      }

      if (!email.includes('@')) {
        setError("Email invalide.");
        return;
      }

      // Créer un utilisateur dans Supabase Auth (le mot de passe est géré par Supabase)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const { user } = data;

      // Hashage du mot de passe avant de l'enregistrer dans la base de données
      const hashedPassword = await bcrypt.hash(password, 10);

      // Ajouter les données dans la table "users" sans le champ `role`
      if (user) {
        const { error: dbError } = await supabase.from("users").insert([
          {
            id: user.id, // ID généré par Supabase
            email,
            fullName,
            password: hashedPassword, // Mot de passe haché
            updatedAt: new Date(),
            createdAt: new Date(),
            settings: {}, // Paramètres vides par défaut
          },
        ]);

        if (dbError) throw dbError;
      }

      setSuccess(true);
      setEmail("");
      setPassword("");
      setFullName("");

      // Redirection vers la page de connexion après succès
      router.push("/connexion");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false); // Réactiver le bouton après la soumission
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
      <form onSubmit={handleSubmit}>
        {/* Champ pour le nom complet */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Morgan"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Parra"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Champ pour l'email */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date of birth
          </label>
          <input
            id="date"
            type="date"
            placeholder="morgan.parra@iloveASM.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="morgan.parra@iloveASM.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Champ pour le mot de passe */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting} // Désactiver le bouton si en cours de soumission
        >
          {isSubmitting ? "Création en cours..." : "Créer un compte"}
        </button>
      </form>

      {/* Message de succès */}
      {success && (
        <p className="mt-4 text-green-600 text-center">
          Compte créé avec succès ! Vous pouvez maintenant vous connecter.
        </p>
      )}

      {/* Message d'erreur */}
      {error && (
        <p className="mt-4 text-red-600 text-center">
          Une erreur est survenue : {error}
        </p>
      )}
    </div>
  );
};

export default CreateAccountPage;