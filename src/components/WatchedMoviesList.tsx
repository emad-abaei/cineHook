import WatchedMovie from "./WatchedMovie";
import { WatchedMovieType } from "../types";

interface WatchedMoviesListProps {
  watched: WatchedMovieType[];
  onDeleteWatchedMovie: (id: string) => void;
}

function WatchedMoviesList({
  watched,
  onDeleteWatchedMovie
}: WatchedMoviesListProps) {
  if (!watched.length)
    return <p className='error'>There is no watched movie.</p>;

  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
