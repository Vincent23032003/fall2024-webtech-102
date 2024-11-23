// client/pages/auth/register.tsx
import React from 'react';
import { useState } from "react";
import { useRouter } from "next/router";
import { createUser } from "../../services/userService";  // Import du service

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !fullName) {
      setError("Email et nom complet sont obligatoires");
      return;
    }

    try {
      // Utiliser la fonction createUser du service
      const newUser = await createUser(email, fullName, avatarUrl, role);
      console.log("Utilisateur créé avec succès", newUser);
      router.push("/auth/callback");  // Redirige vers la page de callback ou d’accueil
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message || "Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de l'avatar"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">Utilisateur</option>
          <option value="ADMIN">Administrateur</option>
        </select>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;

