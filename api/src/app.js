import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Si tu veux permettre des requêtes cross-origin (par exemple, entre le frontend et le backend)
import router from "./routes"; // Importer les routes définies plus haut
import { checkAdmin, checkUserRole } from "./middlewares/roleMiddleware"; // Middlewares

const app = express();

// Middleware global
app.use(cors()); // Autorise les requêtes provenant de ton frontend
app.use(bodyParser.json()); // Pour parser le corps des requêtes en JSON

// Utilisation des routes
app.use("/api", router);

// Utiliser un middleware spécifique si nécessaire
// Par exemple, pour une route admin uniquement
app.use("/admin", checkAdmin, router);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
