import prisma from "../models/prismaClient";

const registerUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const user = await prisma.user.create({
      data: { email, name, password },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export default registerUser;