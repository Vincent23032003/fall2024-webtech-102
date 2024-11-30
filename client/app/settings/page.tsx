"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

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
    "https://gravatar.com/avatar/a1c64b32bb2a092e17e439b8f58203b4?s=400&d=robohash&r=x",
  ];

  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState(gravatarList[0]);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const openLibrary = () => setIsLibraryOpen(true);
  const closeLibrary = () => setIsLibraryOpen(false);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setFormData((prevState: any) => ({
      ...prevState,
      avatarUrl: avatar,
    }));
    closeLibrary();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/connexion"; // Rediriger vers la page de connexion
  };

  useEffect(() => {
    // Fonction pour récupérer l'utilisateur et ses détails supplémentaires
    const getUser = async () => {
      try {
        // Récupère l'utilisateur connecté
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
          // Gestion propre des cas où aucune session n'est active
          console.warn("Aucun utilisateur connecté ou session manquante.");
          setUser(null);
        } else {
          setUser(authData.user); // Stocke l'utilisateur dans l'état

          // Récupérer les détails de l'utilisateur depuis la table 'users'
          const { data, error } = await supabase
            .from("users") // Assurez-vous que votre table s'appelle 'users'
            .select("*") // Sélectionner toutes les colonnes ou des colonnes spécifiques comme 'name', 'avatar', etc.
            .eq("id", authData.user.id) // Filtrer par l'ID de l'utilisateur connecté
            .single(); // On prend seulement un utilisateur, car il est censé être unique

          if (error) {
            console.error("Erreur lors de la récupération des détails de l'utilisateur:", error.message);
          } else {
            setUserDetails(data); // Stocke les détails supplémentaires dans l'état

            // Mettez à jour le formulaire avec les informations de l'utilisateur
            setFormData({
              username: data.username,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              birthDate: data.birthDate,
              avatarUrl: data.avatarUrl || gravatarList[0], // Utilise l'avatar de l'utilisateur ou un avatar par défaut
            });
            setSelectedAvatar(data.avatarUrl || gravatarList[0]);
          }
        }
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération de l'utilisateur", error);
        setUser(null); // Réinitialiser l'utilisateur en cas d'erreur
      }
    };

    getUser(); // Appel de la fonction pour récupérer l'utilisateur
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };

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
        console.error("Erreur lors de la mise à jour :", error.message);
        alert("Une erreur est survenue.");
      } else {
        alert("Modifications successfully registered !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {!user ? (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            You are not currently connected.
          </h1>
          <p className="text-gray-800">
            Sign in or create an account to access to this page.
          </p>
          <button
            onClick={() => (window.location.href = "/connexion")}
            className="mt-6 bg-blue-900 text-white font-medium py-2 px-4 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="h-screen">
          {userDetails ? (
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile details</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center mb-8">
                  <img
                    src={selectedAvatar}
                    alt=""
                    className="w-48 h-48 rounded-full object-cover mb-4 bg-gray-200"
                  />

                  <button
                    onClick={openLibrary}
                    className="w-5/12 h-1/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
                  >
                    Change your gravatar
                  </button>
                </div>
                {isLibraryOpen && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                      <h2 className="text-xl font-bold mb-4">Choose a gravatar</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {gravatarList.map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt=""
                            onClick={() => handleAvatarSelect(avatar)}
                            className="w-20 h-20 rounded-full object-cover cursor-pointer bg-gray-200"
                          />
                        ))}
                      </div>
                      <button
                        onClick={closeLibrary}
                        className="mt-4 bg-white border border-red-800 text-red-800 px-4 py-2 rounded-lg hover:bg-red-800 hover:text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-col mb-8">
                  <div>
                    <label htmlFor="username"  className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="firstName" className="block mt-4 text-sm font-medium text-gray-700">
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
                    <label htmlFor="lastName" className="block mt-4 text-sm font-medium text-gray-700">
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
                    <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full  px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="birthDate" className="block mt-4 text-sm font-medium text-gray-700">
                      Date of Birth
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
              <div className="mt-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`w-full bg-blue-900 text-white font-medium py-2 px-4 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Saving..." : "Save modifications"}
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full bg-white border border-red-800 text-red-800 font-medium py-2 px-4 rounded-lg hover:bg-red-800 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <p>Loading of user details...</p>
          )}
        </div>
      )}
    </main>
  );
}
