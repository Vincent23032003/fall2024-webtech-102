const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Servir le frontend depuis le dossier CLIENTS
app.use(express.static(path.join(__dirname, '../../CLIENTS')));

// Utilisation des routes pour l'API
app.use('/api', routes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
