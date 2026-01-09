import { createContext, useEffect, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("movieWishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("movieWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    if (!wishlist.find((m) => m.id === movie.id)) {
      setWishlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWishlist = (movieId) => {
    setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      "useWishlist doit être utilisé à l'intérieur de WishlistProvider"
    );
  }
  return context;
};
