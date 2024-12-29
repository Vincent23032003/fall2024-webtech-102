"use client";

import React from "react";
import { useEffect, useState } from "react";

export default function ThemeSelector() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Charger le thème depuis localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme); // Sauvegarder le thème
    document.documentElement.classList.toggle("dark", selectedTheme === "dark");
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => toggleTheme("light")}
        className={`px-4 py-2 rounded ${
          theme === "light"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
        }`}
      >
        Light Mode
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className={`px-4 py-2 rounded ${
          theme === "dark"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
        }`}
      >
        Dark Mode
      </button>
    </div>
  );
}
