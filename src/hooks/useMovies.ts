import { useEffect, useState } from 'react';
import { MovieType, ApiResponseType } from '../types';
import { API_KEY } from '../utils/constants';

export function useMovies(query: string, callback?: () => void) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    callback?.(); // Close movie detail when query is changed

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error('Something went weong. Could not fetch movies');

        const data: ApiResponseType = await res.json();

        if (data.Response === 'False')
          throw new Error(data.Error || 'Movie not found.');

        setMovies(data.Search || []);
      } catch (err) {
        if (err instanceof DOMException && err.name == 'AbortError') {
          console.log('Fetch aborted');
        } else {
          const errorMessage =
            err instanceof Error ? err.message : 'An unknown error occurred';

          console.error(errorMessage);

          setError(errorMessage); // Prevent cousing error due to abort();
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    const debounceTimeout = setTimeout(() => {
      fetchMovies();
    }, 500); // Adjust debounce delay

    return () => {
      clearTimeout(debounceTimeout); // Cleat debounce timer
      controller.abort(); // Abort fetch request (to prevent racing conditions)
    };
  }, [query]);

  return { movies, isLoading, error };
}
