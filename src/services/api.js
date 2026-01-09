const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fonction générique pour gérer les erreurs
const fetchFromTMDB = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "fr-FR"); // On force le français

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erreur appel TMDb:", error);
    throw error;
  }
};

// 1. Lister les films
export const getMovies = (category = "popular", page = 1) => {
  // endpoint attendu : /movie/popular, /movie/top_rated, etc.
  return fetchFromTMDB(`/movie/${category}`, { page });
};

// 2. Détails d'un film spécifique
export const getMovieDetails = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}`);
};

// 3. Acteurs principaux
export const getMovieCredits = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
};

// 4. Rechercher un film
export const searchMovies = (query, page = 1) => {
  return fetchFromTMDB("/search/movie", { query, page });
};

// 5. Bonus : Films similaires (Step 3.8)
export const getSimilarMovies = (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/similar`);
};
