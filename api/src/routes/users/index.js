import prisma from "../../models/prismaClient";

// Créer un nouvel utilisateur
// api/src/routes/users/index.js
const express = require('express');
const bcrypt = require('bcryptjs');
const prisma = require('../../models/prismaClient');

const router = express.Router();

// Route pour enregistrer un nouvel utilisateur
router.post('/', async (req, res) => {
  const { email, fullName, password } = req.body;

  // Vérification des champs requis
  if (!email || !fullName || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword, // Sauvegarder le mot de passe haché
      },
    });

    return res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

module.exports = router;


// Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const users = await prisma.user.findMany({
      include: { posts: true, comments: true, profile: true }, // Inclure les relations
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true, comments: true, profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};
