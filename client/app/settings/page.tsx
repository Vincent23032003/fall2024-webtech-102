"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null); // Utilisateur connecté
  const [userDetails, setUserDetails] = useState<any>(null); // Détails utilisateur
  const [formData, setFormData] = useState<any>({}); // Données du formulaire
  const [loading, setLoading] = useState<boolean>(false); // État du bouton de sauvegarde

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
            } else {
              setUserDetails(data);
              setFormData(data); // Initialiser les champs avec les valeurs actuelles
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
        })
        .eq("id", user.id);

      if (error) {
        console.error("Erreur lors de la mise à jour:", error.message);
        alert("Erreur lors de la sauvegarde des modifications.");
      } else {
        alert("Modifications sauvegardées avec succès !");
      }
    } catch (error) {
      console.error("Une erreur est survenue:", error);
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
                      Courriel
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
                      Date de naissance
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
                className="mt-6 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
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
