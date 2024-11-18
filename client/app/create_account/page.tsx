"use client"; // Directive pour rendre ce composant côté client

import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { supabase } from '../../utils/supabaseClient';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    });
  
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const { email, password, confirmPassword, username } = formData;
  
      if (password !== confirmPassword) {
        setErrorMessage('Les mots de passe ne correspondent pas.');
        return;
      }
  
      try {
        // Inscription avec Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
  
        if (authError) throw authError;
  
        const user = authData?.user;
  
        if (!user) {
          throw new Error('Utilisateur non créé.');
        }
  
        // Ajouter un profil utilisateur dans la table "users"
        const { error: dbError } = await supabase
          .from('users')
          .insert([{ id: user.id, username, email }]);
  
        if (dbError) throw dbError;
  
        setSuccessMessage('Compte créé avec succès !');
        setErrorMessage('');
      } catch (error) {
        console.error(error);
        setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmer le mot de passe"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          required
        />
        <button type="submit">S'inscrire</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    );
  }