import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imageUrl = import.meta.env.VITE_API_IMAGE_URL + movie.poster_path;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block hover:scale-105 transition-transform duration-200"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
        {/* Affiche du film */}
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-[350px] object-cover"
        />

        {/* Infos */}
        <div className="p-3">
          <h3 className="font-bold text-lg truncate" title={movie.title}>
            {movie.title}
          </h3>
          <div className="flex justify-between items-center mt-2 text-gray-600">
            <span className="text-sm">{movie.release_date?.split("-")[0]}</span>
            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
