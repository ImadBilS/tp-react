import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  return (
    <div className="text-center text-2xl mt-10">Détails du film n°{id}</div>
  );
};
export default MovieDetail;
