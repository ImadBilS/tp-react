import { useState } from "react";
import { useWishlist } from "../context/WishListContext";
import MovieCard from "../components/MovieCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [filter, setFilter] = useState("");

  const filteredMovies = wishlist.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 mt-4 flex items-center gap-2">
        Ma Wishlist
        <span className="text-lg font-normal text-gray-500">
          ({wishlist.length} films)
        </span>
      </h2>

      {wishlist.length > 0 && (
        <div className="mb-8">
          <input
            type="text"
            placeholder="Filtrer mes favoris..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      )}

      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-2xl text-gray-400 mb-4">
            Votre liste est vide pour le moment.
          </p>
          <a href="/" className="text-blue-600 hover:underline text-lg">
            Aller ajouter des films
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Aucun film ne correspond à votre recherche.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
