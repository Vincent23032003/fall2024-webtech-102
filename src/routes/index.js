// src/routes/index.js

const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Importer le modèle de base de données

// Route pour la racine
router.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des articles et commentaires!');
});

// Route pour obtenir tous les articles
router.get('/articles', (req, res) => {
    res.json(db.articles);
});

// Route pour obtenir les commentaires d'un article spécifique
router.get('/articles/:id/comments', (req, res) => {
    const { id } = req.params;
    const commentsForArticle = db.comments.filter(comment => comment.articleId === id);
    res.json(commentsForArticle);
});

module.exports = router;

