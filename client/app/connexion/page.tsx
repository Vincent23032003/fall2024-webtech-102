"use client"

import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,  // Correction ici : value au lieu de data
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Réinitialiser les erreurs

        try {
            const { data: signInData, error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                setError('Connexion échouée : Email ou mot de passe incorrect');
            } else {
                // Connexion réussie
                alert('Connexion réussie !');
                // Rediriger vers la page d'accueil ou le dashboard
                router.push('/dashboard'); // Remplacez '/dashboard' par votre route souhaitée
            }
        } catch (error) {
            setError('Une erreur s\'est produite lors de la connexion');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center p-6">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {error && (
                        <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {error}
                        </div>
                    )}
                    <label htmlFor="email" className="block mb-2 font-custom text-sm text-gray-900 dark:text-white">Your Email</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                            </svg>
                        </span>
                        <input 
                            type="email"
                            name="email" 
                            id="email"
                            value={data.email} 
                            onChange={handleChange} 
                            required 
                            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="example@example.com" 
                        />
                    </div>
                    <label htmlFor="password" className="block mb-2 font-custom text-sm text-gray-900 dark:text-white">Password</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            value={data.password} 
                            onChange={handleChange}
                            required 
                            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>
                    <div className="w-full text-center p-6">
                        <button type="submit" className="block w-full font-custom text-white hover:text-yellow-400 border border-white hover:border-yellow-400 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 text-base text-center me-2 mb-2 mr-2.5">
                            Submit
                        </button>
                        <Link href="/create_account" className="block w-full font-custom text-white hover:text-yellow-400 hover:underline">
                            Create your account
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}