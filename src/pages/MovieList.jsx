import { useEffect, useState } from "react";
import { getMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = searchTerm.trim()
        ? await searchMovies(searchTerm)
        : await getMovies(category);

      setMovies(data.results);
    } catch {
      setError("Impossible de charger les films.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      fetchMovies();
    }
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  const categories = [
    { key: "popular", label: "Populaires 🔥" },
    { key: "now_playing", label: "En Salle 🍿" },
    { key: "top_rated", label: "Mieux Notés ⭐" },
    { key: "upcoming", label: "À Venir 📅" },
  ];

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSearchSubmit}
        className="flex justify-center gap-2 mb-6 mt-4"
      >
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-l-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 font-bold"
        >
          🔍
        </button>
      </form>

      {!searchTerm && (
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                category === cat.key
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {searchTerm && (
        <div className="text-center mb-6">
          <button
            onClick={() => {
              setSearchTerm("");
              window.location.reload();
            }}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Effacer la recherche et revenir aux films
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center text-xl mt-10 animate-pulse">
          Chargement...
        </div>
      )}
      {error && <div className="text-center text-red-500 mt-10">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
