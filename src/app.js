const express = require('express');
const app = express();
const routes = require('./routes/index');

// Middleware for analyse of JSON's requests
app.use(express.json());

// Utilisation des routes
app.use('/api', routes);

// start the serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
