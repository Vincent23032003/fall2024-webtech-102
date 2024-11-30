//client/app/connexion/page.tsx :
"use client"

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/navigation";

const ConnexionPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      setError(null);
      setSuccess(false);

      if (!email.includes("@")) {
        setError("Email invalide.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        setError("Email ou mot de passe incorrect.");
        return;
      }

      // Utiliser `supabase.auth.getUser()` pour récupérer l'utilisateur connecté
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        setError("Erreur lors de la récupération des données de l'utilisateur.");
        return;
      }

      // Vérifier si userData contient un utilisateur
      if (userData && userData.user) {
        console.log("ID de l'utilisateur connecté :", userData.user.id); // Accéder à l'ID de l'utilisateur
        // Tu peux maintenant utiliser `userData.user.id` pour effectuer des actions spécifiques à cet utilisateur
      }

      setSuccess(true);
      setEmail("");
      setPassword("");

      router.push("/"); // Redirection après connexion
    } catch (err: any) {
      setError("Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className='h-screen'>
      <div className="max-w-md mx-auto m-10 bg-white p-6 rounded-lg shadow-md">
        <div className='grid grid-cols-3 m-4'>
          <div className='flex justify-center items-center'>
            <Image
              src="/assets/Logo_ASM.svg"
              width={90}
              height={90}
              alt="asm-logo"
            />
          </div>
          <div className="text-2xl font-bold mb-6 text-center text-gray-800">
            Back to the Yellow Army !
          </div>
          <div className='flex justify-center items-center'>
            <Image
              src="/assets/Logo_ASM.svg"
              width={90}
              height={90}
              alt="asm-logo"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="rougerie@iloveASM.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mb-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connection in progress..." : "Sign in"}
          </button>
        </form>
        <span className="mt-6 text-center">
          <p className="text-base text-gray-600 mb-2">
            Don't have an account ?
          </p>
          <Link href="/create_account" className="w-full flex justify-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2">
            Create an account
          </Link>
        </span>
      </div>

      {success && (
        <p className="mt-4 text-green-600 text-center">
          Connexion réussie ! Vous êtes maintenant connecté.
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default ConnexionPage;
