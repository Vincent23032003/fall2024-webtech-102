"use client";

import React, { useState } from "react";
import { createUser } from "../../services/userService";

export default function CreateAccountPage() {
    const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createUser(formData.email, formData.password, formData.fullName);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError("Une erreur s'est produite lors de la création du compte.");
            setSuccess(false);
        }
    };

    return (
        <div>
            <h1>Créer un compte</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom complet"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Créer</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Compte créé avec succès !</p>}
        </div>
    );
}
