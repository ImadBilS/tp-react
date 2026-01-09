import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
} from "../services/api";
import { useWishlist } from "../context/WishlistContext";
import MovieCard from "../components/MovieCard";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        setLoading(true);

        const [movieData, creditsData, similarData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getSimilarMovies(id),
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
        setSimilarMovies(similarData.results.slice(0, 6));
      } catch {
        setError("Impossible de charger les détails du film.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-xl mt-10 animate-pulse">
        Chargement des détails...
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  if (!movie) return <div className="text-center mt-10">Film introuvable</div>;

  const isFavorite = isInWishlist(movie.id);

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="bg-white min-h-screen pb-10">
      <div
        className="relative w-full h-[400px] bg-cover bg-center text-white"
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : "none",
          backgroundColor: "#1a202c",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="container mx-auto p-6 flex flex-col md:flex-row items-center gap-8">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-48 rounded-lg shadow-2xl border-4 border-white hidden md:block"
            />
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="italic text-gray-300 mb-4">{movie.tagline}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded">
                  ⭐ {movie.vote_average.toFixed(1)}/10
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded">
                  📅 {movie.release_date?.split("-")[0]}
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded">
                  ⏱️ {movie.runtime} min
                </span>
              </div>
              <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="text-sm border border-gray-400 px-2 py-1 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Synopsis</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {movie.overview || "Aucun résumé disponible."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Têtes d'affiche
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {cast.map((actor) => (
                <div
                  key={actor.id}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow text-center"
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/150x225?text=No+Img"
                    }
                    alt={actor.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-bold text-sm truncate">{actor.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {similarMovies.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2 mt-8">
                Vous aimerez peut-être...
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {similarMovies.map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg shadow border sticky top-24">
            <h3 className="font-bold text-lg mb-4">Actions</h3>
            <button
              onClick={() =>
                isFavorite ? removeFromWishlist(movie.id) : addToWishlist(movie)
              }
              className={`w-full py-2 rounded font-bold transition-colors mb-2 ${
                isFavorite
                  ? "bg-red-100 text-red-600 border border-red-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isFavorite ? "💔 Retirer" : "❤️ Ajouter à la Wishlist"}
            </button>

            <Link
              to="/"
              className="block text-center mt-4 text-gray-500 hover:text-black text-sm"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
