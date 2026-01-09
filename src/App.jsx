import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar /> {/* La Navbar est visible sur toutes les pages */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
