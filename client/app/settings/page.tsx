"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { getRandomValues } from "crypto";

export default function SettingsPage() {

  const gravatarList = [
    "https://gravatar.com/avatar/fb6d18d4bb9824850e8dfbe24d87809a?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/a8bc016c863eebaa9c1f7d6a3599ed54?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/3d2da74f67c0737bd4eaeb8178b8a62f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/8d4b50ebd7b5c6671b70ac19a66c75de?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/1795377143f83fa72bddf4eb9503c9fa?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/2d9d9ca28b140d6693f88f275237a02a?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/d80b64c1976ab3241189805dca72f004?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/6b8571d69aa7bb4aa21b7e370d6e6846?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/a1c64b32bb2a092e17e439b8f58203b4?s=400&d=robohash&r=x"
    // Ajoutez d'autres images ici
  ];

  const [user, setUser] = useState<any>(null); // Utilisateur connecté
  const [userDetails, setUserDetails] = useState<any>(null); // Détails utilisateur
  const [formData, setFormData] = useState<any>({}); // Données du formulaire
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState(gravatarList[0]); // Avatar par défaut
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const openLibrary = () => setIsLibraryOpen(true);
  const closeLibrary = () => setIsLibraryOpen(false);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setFormData((prevState: any) => ({
      ...prevState,
      avatarUrl: avatar,  // Mettre à jour avatarUrl dans formData
    }));
    closeLibrary();
  };

  // Récupérer l'utilisateur et ses détails
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError) {
          console.error("Erreur lors de la récupération de l'utilisateur:", authError.message);
        } else {
          setUser(authData.user);

          if (authData.user) {
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", authData.user.id)
              .single();

            if (error) {
              console.error("Erreur lors de la récupération des détails utilisateur:", error.message);
            }  else {
              setUserDetails(data);
              setFormData(data); // Initialiser les champs avec les valeurs actuelles
  
              // Mettre à jour l'avatar avec l'URL de l'avatar de l'utilisateur
              setSelectedAvatar(data.avatarUrl || gravatarList[0]); // Utiliser avatarUrl de l'utilisateur ou un avatar par défaut
            }
          }
        }
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération de l'utilisateur:", error);
      }
    };

    getUser();
  }, []);

  // Gérer les modifications dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          birthDate: formData.birthDate,
          avatarUrl: formData.avatarUrl,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error during update:", error.message);
        alert("An error occurs.");
      } else {
        alert("Modifications successfully saved !");
      }
    } catch (error) {
      console.error("An error occurs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {user ? (
        <div className="h-screen">
          {userDetails ? (
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Your profil</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center mb-8">
                  <img
                    src={selectedAvatar}
                    alt=""
                    className="w-60 h-60 rounded-full object-cover mb-4 bg-gray-200"
                  />
                  <button
                    onClick={openLibrary}
                    className=" w-5/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
                  >
                    Change your gravatar
                  </button>

                  <button
                    className="w-5/12 h-1/12 flex inline-block justify-center mt-4 text-red-800 border border-red-800 border-2 px-3 py-2 rounded-lg hover:text-white hover:bg-red-800"
                  >
                    Sign out
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                  </button>

                </div>
                {isLibraryOpen && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                      <h2 className="text-xl font-bold mb-4">Choose your gravatar</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {gravatarList.map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt=""
                            onClick={() => handleAvatarSelect(avatar)}
                            className="w-20 h-20 rounded-full object-cover cursor-pointer hover:ring-4 hover:ring-blue-900 bg-gray-200"
                          />
                        ))}
                      </div>
                      <button
                        onClick={closeLibrary}
                        className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={formData.username || ""}
                      onChange={handleInputChange}
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
                      value={formData.firstName || ""}
                      onChange={handleInputChange}
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
                      value={formData.lastName || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                      Date of birth
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      value={formData.birthDate || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                </div>
              </div>

              {/* Bouton de sauvegarde */}
              <button
                onClick={handleSave}
                className="mt-6 w-full bg-blue-900 text-white font-medium py-2 px-4 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save modifications"}
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

