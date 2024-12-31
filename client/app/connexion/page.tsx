"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";

const ConnexionPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setError(null);

      if (!email.includes("@")) {
        setError("Courriel invalide.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Incorrect email address or password.");
        return;
      }


      router.push("/settings");
    } catch (err: any) {
      setError("An error has occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("GitHub login error:", error.message);
        setError("Error connecting to GitHub.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An error has occurred with GitHub.");
    }
  };


  return (
    <div className="h-screen">
      <div className="max-w-md mx-auto m-10 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-3 m-4">
          <div className="flex justify-center items-center">
            <Image
              src="/assets/Logo_ASM.svg"
              width={90}
              height={90}
              alt="asm-logo"
            />
          </div>
          <div className="text-2xl font-bold mb-6 text-center text-gray-800">
            Back to the Yellow Army!
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/assets/Logo_ASM.svg"
              width={90}
              height={90}
              alt="asm-logo"
            />
          </div>
        </div>

        {/* Formulaire de connexion classique */}
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
            className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connecting..." : "Sign in"}
          </button>
        </form>

        {/* Connexion avec GitHub */}
        <div className="text-center my-4">
          <p className="text-gray-700 mb-4">OR</p>
          <button
            onClick={handleGithubLogin}
            className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
          >
            Sign in with GitHub
          </button>
        </div>

        <span className="mt-6 text-center">
          <p className="text-base text-gray-600 mb-2">Don't have an account?</p>
          <Link
            href="/create_account"
            className="w-full flex justify-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
          >
            Create an account
          </Link>
        </span>
      </div>

      {/* Messages d'erreur */}
      {error && (
        <p className="mt-4 text-red-600 text-center">{error}</p>
      )}
    </div>
  );
};

export default ConnexionPage;
