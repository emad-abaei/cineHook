import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "../hooks/useKey";
import { ApiResponseMoiveType, WatchedMovieType } from "../types";
import { API_KEY, DEFAULT_APP_TITLE } from "../utils/constants";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatchedMovie: (movie: WatchedMovieType) => void;
  watched: WatchedMovieType[];
}

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watched
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<Partial<ApiResponseMoiveType>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.find((movie) =>
    movie.imdbID === selectedId ? true : false
  );
  const watchedMovieUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title = "-",
    Poster: poster = "-",
    Runtime: runtime = "-",
    Year: year = "-",
    imdbRating = 0,
    Plot: plot = "-",
    Released: released = "-",
    Actors: actors = "-",
    Director: director = "-",
    Genre: genre = "-",
    Type: type = "-"
  } = movie;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setUserRating(0);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!res.ok) throw new Error("Could not find the movie!");

        const data: ApiResponseMoiveType = await res.json();

        if (data.Response === "False")
          throw new Error(data.Error || "Movie not found!");

        setMovie(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occured.";
        console.log(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [selectedId]);

  useEffect((): (() => void) => {
    const trimmedTitle = title?.trim();

    document.title = trimmedTitle ? `Movie | ${title}` : DEFAULT_APP_TITLE;

    return () => (document.title = DEFAULT_APP_TITLE);
  }, [title]);

  useKey("Escape", onCloseMovie);

  function handleClick(): void {
    onCloseMovie();
  }

  function handleRate(rate: number): void {
    setUserRating(rate);
  }

  function handleAddMovie(): void {
    const newWatchedMovid: WatchedMovieType = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      Type: type,
      runtime: Number(runtime.split(" ").at(0) || 0),
      imdbRating: Number(imdbRating) || 0,
      userRating
    };

    onAddWatchedMovie(newWatchedMovid);
  }

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={handleClick}>
              <IoMdArrowRoundBack />
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <FaStar size={18} className='icon-star' /> {imdbRating} IMDB
                rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {isWatched ? (
                <>
                  <p>
                    You have rated this movie {watchedMovieUserRating}
                    <FaStar size={15} className='icon-star' />
                  </p>
                </>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    onRate={handleRate}
                    size={22}
                  />
                  {userRating > 0 ? (
                    <button className='btn-add' onClick={handleAddMovie}>
                      Add Movie
                    </button>
                  ) : <p>Rate the movie</p>}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
