import prisma from "../../models/prismaClient";

// Créer un nouvel utilisateur
export const createUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, fullName, avatarUrl, role = "USER" } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        avatarUrl,
        role, // Peut être "USER" ou "ADMIN"
      },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const users = await prisma.user.findMany({
      include: { posts: true, comments: true, profile: true }, // Inclure les relations
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true, comments: true, profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};
