// client/services/userService.ts

// Fonction pour créer un utilisateur
export const createUser = async (email: string, fullName: string, avatarUrl: string, role: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, avatarUrl, role }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création de l'utilisateur");
      }
  
      return await response.json();  // Renvoie l'utilisateur créé
    } catch (error) {
      throw error;
    }
  };
  
  // Fonction pour récupérer tous les utilisateurs
  export const getUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  