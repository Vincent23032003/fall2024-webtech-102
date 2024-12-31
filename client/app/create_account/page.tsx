"use client";

import React from 'react';
import Image from 'next/image';
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import bcrypt from "bcryptjs";
import { useRouter } from 'next/navigation';

const CreateAccountPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
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


      if (password.length < 6) {
        setError("The password must contain at least 6 characters.");
        return;
      }

      if (!email.includes('@')) {
        setError("Email invalid.");
        return;
      }


      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const { user } = data;


      const hashedPassword = await bcrypt.hash(password, 10);


      if (user) {
        const { error: dbError } = await supabase.from("users").insert([
          {
            id: user.id,
            email,
            username,
            firstName,
            lastName,
            birthDate,
            password: hashedPassword,
            updatedAt: new Date(),
            created_at: new Date(),
            settings: {},
          },
        ]);

        if (dbError) throw dbError;
      }

      setSuccess(true);
      setEmail("");
      setPassword("");
      setUsername("");
      setFirstName("");
      setLastName("");
      setBirthDate("");


      router.push("/connexion");
    } catch (err: any) {
      setError(err.message || "An error has occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-full'>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
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
            Join the Yellow Army !
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
          {/* Field for full name */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Momo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Morgan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date of birth
            </label>
            <input
              id="date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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

          <button
            type="submit"
            className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creation in progress..." : "Create account"}
          </button>
        </form>
      </div>

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