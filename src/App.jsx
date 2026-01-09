import { useEffect } from "react";
import { getMovies } from "./services/api"; // Assure-toi que le chemin est bon

function App() {
  useEffect(() => {
    // On lance un appel test vers les films populaires
    console.log("Tentative de connexion à l'API...");

    getMovies("popular")
      .then((data) => {
        console.log("✅ Succès ! Données reçues :", data);
      })
      .catch((error) => {
        console.error("❌ Erreur :", error);
      });
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Test API en cours...</h1>
      <p>Ouvre la console du navigateur (F12) pour voir le résultat.</p>
    </div>
  );
}

export default App;
