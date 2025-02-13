import { MovieType } from "../types";
import { BsCalendar2Date } from "react-icons/bs";

interface MovieItemProps {
  movie: MovieType;
  onSelectMovie: (id: string) => void;
}

function MovieItem({ movie, onSelectMovie }: MovieItemProps) {
  function handleClick(): void {
    onSelectMovie(movie.imdbID);
  }

  return (
    <li onClick={handleClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <BsCalendar2Date size={16} className='icon-date' />
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieItem;
