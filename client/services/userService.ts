// client/services/userService.ts

// Fonction pour créer un utilisateur
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createUser = async (email: string, password: string, fullName: string) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return await response.json();
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
  
  