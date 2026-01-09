import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo qui redirige vers l'accueil */}
        <Link to="/" className="text-xl font-bold text-blue-400">
          ReactMovies
        </Link>

        {/* Liens de navigation */}
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-300">
            Accueil
          </Link>
          <Link to="/wishlist" className="hover:text-blue-300">
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
