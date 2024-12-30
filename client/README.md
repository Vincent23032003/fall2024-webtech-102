# Webtech Project - ASM Fan Club Website

## Introduction

Bienvenue sur le projet frontend du site dédié aux fans de l'ASM Clermont Auvergne. Ce projet rassemble toutes les pages web qui composent le site et est mis à jour régulièrement. L'objectif est d'offrir une plateforme intuitive, dynamique et interactive pour mettre en avant les actualités, l'histoire, les joueurs, et les trophées du club.

---

## Features 🏉

### **1. Pages et fonctionnalités principales**

#### **1.1 Home Page**
La page d'accueil offre un aperçu dynamique des informations principales du club :
- Dernier match joué, classement actuel, et prochain match à venir (données récupérées via Supabase).
- Identification des utilisateurs connectés et gestion automatique de leurs informations.
- Accès rapide aux articles, légendes, et joueurs via des boutons interactifs.

#### **1.2 Layout**
Structure globale de l'application :
- Barre de navigation et pied de page.
- Design harmonieux avec arrière-plan dégradé et styles globaux.

#### **1.3 Articles ([id])**
Détails d'un article :
- Titre, description, auteur, date de publication, et likes.
- Fonctionnalités interactives : ajouter, modifier ou supprimer des commentaires ; liker ou retirer un like.

#### **1.4 Auth Callback**
Gère la redirection après authentification :
- Redirige vers `/settings` en cas de succès.
- Redirige vers `/connexion` en cas d'échec.

#### **1.5 Blog**
Liste paginée d'articles :
- Recherche par titre et navigation entre les pages.
- Création, modification, et suppression d'articles (utilisateurs connectés).

#### **1.6 Blog - New**
Création d'un nouvel article :
- Éditeur WYSIWYG pour saisir titre et description.
- Validation des données et redirection après succès.

#### **1.7 Blog - Edit**
Modification d'un article existant :
- Préremplit les champs avec les données actuelles.
- Valide et enregistre les modifications.

#### **1.8 Club**
Présente l'histoire du club :
- Chronologie des événements marquants organisée par périodes.
- Animations fluides et responsive.

#### **1.9 Connexion**
Connexion via deux méthodes :
- Email/mot de passe avec redirection vers `/settings` après succès.
- Authentification OAuth via GitHub.

#### **1.10 Create Account**
Création de compte :
- Validation des champs et hashage sécurisé du mot de passe.
- Redirection vers `/connexion` après succès.

#### **1.11 Legends**
Met en avant les légendes modernes du club :
- Présentation interactive des joueurs avec informations détaillées.

#### **1.12 Previous Matches**
Liste des matchs précédents, regroupés par semaines :
- Détails des scores, noms des équipes, et logos.

#### **1.13 Results**
Classement actuel et prochaines rencontres :
- Classement complet des équipes avec statistiques.
- Liste des matchs à venir.

#### **1.14 Settings**
Personnalisation du profil utilisateur :
- Modification des informations personnelles et choix d’un avatar.
- Déconnexion sécurisée.

#### **1.15 Support**
Facilite le contact avec les membres du projet :
- Coordonnées des membres avec liens pour les contacter par email.

#### **1.16 Team**
Met en avant l'équipe actuelle :
- Informations détaillées sur chaque joueur.

#### **1.17 Trophies**
Mise en lumière des trophées remportés :
- Présentation animée des victoires et finales jouées.

---

## Technologies utilisées 👨🏻‍💻

- **Framework Frontend :** [Next.js](https://nextjs.org/)
- **Langage :** TypeScript (TSX)
- **Styles :** Tailwind CSS
- **Base de données et authentification :** [Supabase](https://supabase.com/)

---

## Utilisation ❓

### **1. Cloner le projet**
```bash
git clone https://github.com/Vincent23032003/fall2024-webtech-102.git
