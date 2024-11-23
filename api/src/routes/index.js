import express from "express";
import { createUser, getUsers, getUserById } from "./users/index.js"; // Import des routes d'utilisateurs

const router = express.Router();

// Route de test pour vérifier si l'API fonctionne
router.get("/", (req, res) => {
  res.status(200).send("API is working!");
});

// Routes utilisateur
router.post("/users", createUser);  // Créer un utilisateur
router.get("/users", getUsers);     // Obtenir tous les utilisateurs
router.get("/users/:id", getUserById); // Obtenir un utilisateur par ID

export default router;
