// src/middlewares/roleMiddleware.js

export const checkAdmin = (req, res, next) => {
    const { user } = req; // Supposons que l'utilisateur est attaché à la requête après une vérification d'authentification
  
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied, Admins only" });
    }
  
    next();
  };
  
  export const checkUserRole = (req, res, next) => {
    const { user } = req; // Récupérer l'utilisateur authentifié
  
    if (!user || (user.role !== "USER" && user.role !== "ADMIN")) {
      return res.status(403).json({ error: "Access denied, Invalid user role" });
    }
  
    next();
  };
  