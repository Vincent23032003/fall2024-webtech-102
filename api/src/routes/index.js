const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route pour la page d'accueil
router.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des articles et commentaires!');
});

// Route pour obtenir tous les articles
router.get('/articles', (req, res) => {
    res.json(db.articles);
});

// Route pour obtenir un article spécifique par ID
router.get('/articles/:id', (req, res) => {
    const { id } = req.params;
    const article = db.articles.find(article => article.id === id);
    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article non trouvé');
    }
});

// Route pour ajouter un nouvel article
router.post('/articles', (req, res) => {
    const newArticle = req.body;
    db.articles.push(newArticle);
    res.status(201).send('Article ajouté');
});

// Route pour obtenir les commentaires d'un article spécifique
router.get('/articles/:id/comments', (req, res) => {
    const { id } = req.params;
    const commentsForArticle = db.comments.filter(comment => comment.articleId === id);
    res.json(commentsForArticle);
});

// Route pour ajouter un nouveau commentaire à un article
router.post('/articles/:id/comments', (req, res) => {
    const { id } = req.params;
    const newComment = req.body;
    newComment.articleId = id;
    db.comments.push(newComment);
    res.status(201).send('Commentaire ajouté');
});

module.exports = router;
