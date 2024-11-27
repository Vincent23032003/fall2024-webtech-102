"use client"

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function SettingsPage() {


    const [user, setUser] = useState<any>(null); // Stocker l'utilisateur dans l'état
    const [userDetails, setUserDetails] = useState<any>(null);


        useEffect(() => {
            const getUser = async () => {
                try {
                    // Récupère l'utilisateur connecté
                    const { data: authData, error: authError } = await supabase.auth.getUser();

                    if (authError) {
                        console.error("Erreur lors de la récupération de l'utilisateur:", authError.message);
                    } else {
                        setUser(authData.user); // Stocke l'utilisateur dans l'état

                        if (authData.user) {
                            // Récupérer les détails de l'utilisateur depuis la table 'users'
                            const { data, error } = await supabase
                                .from('users') // Assurez-vous que votre table s'appelle 'users'
                                .select('*') // Sélectionner toutes les colonnes ou des colonnes spécifiques comme 'name', 'avatar', etc.
                                .eq('id', authData.user.id) // Filtrer par l'ID de l'utilisateur connecté
                                .single(); // On prend seulement un utilisateur, car il est censé être unique

                            if (error) {
                                console.error("Erreur lors de la récupération des détails de l'utilisateur:", error.message);
                            } else {
                                setUserDetails(data); // Stocke les détails supplémentaires dans l'état
                            }
                        }
                    }
                } catch (error) {
                    console.error("Une erreur est survenue lors de la récupération de l'utilisateur", error);
                }
            };

            getUser(); // Appel de la fonction pour récupérer l'utilisateur
        }, []);
        return (
            <main>
                {user ? (
                    <div className="h-screen">
                        {userDetails ? (
                            <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
                                <h1 className="text-2xl font-bold mb-4 text-gray-800">Profil utilisateur</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                placeholder={userDetails.username}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                placeholder={userDetails.firstName}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                placeholder={userDetails.lastName}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Courriel
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="Votre courriel"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                                                Date de naissance
                                            </label>
                                            <input
                                                type="date"
                                                id="birthDate"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bouton de sauvegarde */}
                                <button className="mt-6 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600">
                                    Enregistrer les modifications
                                </button>
                            </div>

                        ) : (
                            <p>Loading user details...</p>
                        )}
                    </div>
                ) : (
                    <div className="mt-4 text-lg text-red-600">
                        <p>You are not logged in.</p>
                    </div>
                )}
            </main>
        );
    }
