/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Spécifie où chercher les fichiers utilisant Tailwind CSS
    './components/**/*.{js,ts,jsx,tsx}', // Modifie selon la structure de ton projet
    './pages/**/*.{js,ts,jsx,tsx, mdx}', // Inclure le dossier pages si nécessaire
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    //require('tailwindcss-font-inter'), // Plugin pour la police Inter
    //require('@tailwindcss/typography'), // Plugin pour la typographie
    //r//equire('@tailwindcss/forms'), // Plugin pour les formulaires
  ],
}
