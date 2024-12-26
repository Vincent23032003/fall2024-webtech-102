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
  const [fetching, setFetching] = useState<boolean>(true); // Ajout pour l'état de chargement initial
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

  const validateForm = () => {
    if (!formData.email || !formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!formData.username || !formData.firstName || !formData.lastName) {
      alert("All fields are required.");
      return false;
    }
    if (new Date(formData.birthDate) > new Date()) {
      alert("Birthdate cannot be in the future.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

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
        alert("An error occurred while saving.");
      } else {
        alert("Modifications successfully registered!");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData?.user) {
          console.warn("No user logged in or session missing.");
          setUser(null);
          setFetching(false);
          return;
        }

        setUser(authData.user);

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (error) {
          if (error.message.includes("JSON object requested, multiple (or no) rows returned")) {
            console.warn("No user found in the 'users' table. Creating a new user...");
            const { data: newUser, error: insertError } = await supabase
              .from("users")
              .insert({
                id: authData.user.id,
                email: authData.user.email || `${authData.user.id}@example.com`, // Email par défaut si manquant
                username: authData.user.email
                  ? authData.user.email.split("@")[0]
                  : `user_${authData.user.id.substring(0, 8)}`, // Crée un username basé sur l'ID si l'email est absent
                avatarUrl: gravatarList[0],
                created_at: new Date(),
              })
              .select()
              .single();


            if (insertError) {
              console.error("Error creating new user:", insertError.message);
              setUserDetails(null);
            } else {
              setUserDetails(newUser);
              setFormData({
                username: newUser.username,
                firstName: "",
                lastName: "",
                email: newUser.email,
                birthDate: "",
                avatarUrl: newUser.avatarUrl,
              });
              setSelectedAvatar(newUser.avatarUrl);
            }
          } else {
            console.error("Error fetching user details:", error.message);
          }
        } else {
          setUserDetails(data);
          setFormData({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            birthDate: data.birthDate,
            avatarUrl: data.avatarUrl || gravatarList[0],
          });
          setSelectedAvatar(data.avatarUrl || gravatarList[0]);
          
        }
      } catch (error) {
        console.error("An error occurred while fetching user:", error);
        setUser(null);
      } finally {
        setFetching(false);
      }
    };

    getUser();
  }, []);
  return (
    <main>
      {fetching ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl text-gray-700">Loading...</p>
        </div>
      ) : !user ? (
        <div className="flex flex-col items-center mt-20 h-screen text-center">
          <h1 className="text-5xl font-bold text-red-600 mb-4">
            You are not currently connected.
          </h1>
          <p className="text-white text-2xl">
            Sign in or create an account to access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/connexion")}
            className="w-3/12 h-1/12 mt-6 bg-blue-900 text-white font-medium py-2 px-4 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
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
                    className="w-48 h-48 rounded-full object-cover mb-4 bg-gray-200"
                  />
                  <button
                    onClick={openLibrary}
                    className="w-5/12 bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2"
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
                <div className="flex flex-col">
                  {["username", "firstName", "lastName", "email", "birthDate"].map((field, index) => (
                    <div key={index} className="mb-4">
                      <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                        {field === "birthDate" ? "Date of Birth" : field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "birthDate" ? "date" : "text"}
                        id={field}
                        value={formData[field] || ""}
                        onChange={(e) =>
                          setFormData((prevState: any) => ({
                            ...prevState,
                            [field]: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`w-full bg-blue-900 text-white font-medium py-2 px-4 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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
            <p className="text-center">Loading user details...</p>
          )}
        </div>
      )}
    </main>
  );
}