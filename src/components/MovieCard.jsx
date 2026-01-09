import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishListContext";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? import.meta.env.VITE_API_IMAGE_URL + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(movie.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault(); // IMPORTANT : Empêche d'aller vers la page détail
    if (isFavorite) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  return (
    <div className="relative group">
      {" "}
      <Link
        to={`/movie/${movie.id}`}
        className="block hover:scale-105 transition-transform duration-200"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-[350px] object-cover"
          />
          <div className="p-3">
            <h3 className="font-bold text-lg truncate" title={movie.title}>
              {movie.title}
            </h3>
            <div className="flex justify-between items-center mt-2 text-gray-600">
              <span className="text-sm">
                {movie.release_date?.split("-")[0]}
              </span>
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors z-10 ${
          isFavorite
            ? "bg-red-500 text-white"
            : "bg-white text-gray-400 hover:text-red-500"
        }`}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        ❤️
      </button>
    </div>
  );
};

export default MovieCard;
