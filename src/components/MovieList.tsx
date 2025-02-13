import MovieItem from "./MovieItem";
import { MovieType } from "../types";

interface MovieListProps {
  movies: MovieType[];
  onSelectMovie: (id: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  if (!movies.length) return <p className='error'>Search for movies.</p>;

  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
