# 🎬 React Movie App — TP Noté

Application web moderne de gestion et de recherche de films, développée avec **React**, **Vite** et **Tailwind CSS**.  
Les données sont récupérées en temps réel via l’API **TMDb (The Movie Database)**.

---

## ✨ Fonctionnalités

### 🧭 Navigation & Consultation
- **Page d’accueil dynamique** : affichage des films selon 4 catégories :
  - Populaires
  - En salle
  - Mieux notés
  - À venir
- **Recherche de films** par titre.
- **Pagination** pour naviguer entre les pages de résultats.
- **Page détail d’un film** avec :
  - Synopsis
  - Note moyenne
  - Date de sortie
  - Durée
  - Genres
  - Affiche et image de fond

### 👥 Casting & Recommandations
- **Casting principal** : affichage des 10 acteurs principaux avec photo et rôle.
- **Films similaires** : suggestions automatiques basées sur le film consulté.

### ❤️ Gestion de la Wishlist
- **Ajout / Retrait de films** à la wishlist.
- **Persistance via localStorage** (la wishlist est conservée après rechargement).
- **Compteur en temps réel** dans la barre de navigation.
- **Page Wishlist dédiée** avec :
  - Liste des films favoris
  - Recherche et filtrage
  - Suppression individuelle

---

## 🛠️ Stack Technique

- **Framework** : React (Vite)
- **Routage** : React Router DOM v6
- **Styles** : Tailwind CSS v4
- **Gestion d’état global** : Context API + hooks personnalisés
- **API externe** : The Movie Database (TMDb)

---

## 🚀 Installation et Lancement

### 1️⃣ Cloner le projet
```bash
git clone <URL_DU_REPO_GITHUB>
cd react-movie-app
