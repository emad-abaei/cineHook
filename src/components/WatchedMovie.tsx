import { WatchedMovieType } from '../types';
import { FaStar } from 'react-icons/fa';
import { LiaStarOfLifeSolid } from 'react-icons/lia';
import { IoIosTimer } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';

interface WatchedMovieProps {
  movie: WatchedMovieType;
  onDeleteWatchedMovie: (id: string) => void;
}

function WatchedMovie({ movie, onDeleteWatchedMovie }: WatchedMovieProps) {
  function handleDelete(): void {
    onDeleteWatchedMovie(movie.imdbID);
  }

  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <FaStar size={16} className="icon-star" />
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <LiaStarOfLifeSolid size={18} className="icon-star" />
          <span>{movie.userRating}</span>
        </p>
        <p>
          <IoIosTimer size={20} className="icon-time" />
          <span>{movie.runtime ? movie.runtime + 'min' : '-'}</span>
        </p>
      </div>
      <button
        type="button"
        className="btn-delete"
        onClick={handleDelete}
        aria-label={`Remove ${movie.Title} from watchlist`}
      >
        <MdDeleteForever size={24} />
      </button>
    </li>
  );
}

export default WatchedMovie;
