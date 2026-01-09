import { useEffect, useState } from "react";
import { getMovies } from "../services/api"; // Ton service API
import MovieCard from "../components/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel API au chargement du composant
    const fetchMovies = async () => {
      try {
        const data = await getMovies("popular"); // On charge les populaires par défaut
        setMovies(data.results);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les films.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // Le tableau vide [] signifie : "exécuter une seule fois au montage"

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 mt-4">Films Populaires</h2>

      {/* Grille responsive (Tailwind) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
