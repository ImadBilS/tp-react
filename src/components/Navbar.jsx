import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishListContext";

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400">
          ReactMovies
        </Link>

        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-blue-300">
            Accueil
          </Link>

          <Link to="/wishlist" className="hover:text-blue-300 relative">
            Wishlist
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
