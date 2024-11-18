const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Valider les données
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'email est déjà utilisé
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hasher et saler le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const newUser = await db.User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Renvoyer une réponse de succès
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement' });
  }
};