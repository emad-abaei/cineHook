import { useState } from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMoviesList';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';
import Logo from './components/Logo';
import NumResults from './components/NumResults';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Switch from './components/Switch';
import { ViewListType, WatchedMovieType } from './types';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useScreen } from './hooks/useScreen';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewList, setViewList] = useState<ViewListType>('watchedMovies');

  const { isSmallScreen } = useScreen();
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState<WatchedMovieType[]>(
    [],
    'cineHook'
  );

  function handleQuery(val: string) {
    setQuery(val);
    setViewList('searchedMovies');
  }

  function handleSelectMovie(id: string): void {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
    setViewList('watchedMovies');
  }

  function handleCloseMovie(): void {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie: WatchedMovieType): void {
    setWatched((watched) => [movie, ...watched]);
    setSelectedId(null);
  }

  function handleDeleteWatchedMovie(id: string): void {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleChangeViewList(list: ViewListType) {
    setViewList(list);
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} onSetQuery={handleQuery} />
        <NumResults moviesNum={movies?.length} />
      </Navbar>

      {isSmallScreen && (
        <Switch viewList={viewList} onChangeViewList={handleChangeViewList} />
      )}

      <Main>
        {!isSmallScreen && (
          <>
            <Box>
              {isLoading && <Loader />}

              {!isLoading && !error && (
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
              )}

              {error && <ErrorMessage message={error} />}
            </Box>
            <Box>
              {selectedId ? (
                <MovieDetails
                  selectedId={selectedId}
                  onCloseMovie={handleCloseMovie}
                  onAddWatchedMovie={handleAddWatchedMovie}
                  watched={watched}
                />
              ) : (
                <>
                  <WatchedSummary watched={watched} />
                  <WatchedMoviesList
                    watched={watched}
                    onDeleteWatchedMovie={handleDeleteWatchedMovie}
                  />
                </>
              )}
            </Box>
          </>
        )}

        {isSmallScreen && viewList === 'searchedMovies' && (
          <Box>
            {isLoading && <Loader />}

            {!isLoading && !error && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}

            {error && <ErrorMessage message={error} />}
          </Box>
        )}

        {isSmallScreen && viewList === 'watchedMovies' && (
          <Box>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatchedMovie={handleAddWatchedMovie}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatchedMovie={handleDeleteWatchedMovie}
                />
              </>
            )}
          </Box>
        )}
      </Main>
    </>
  );
}
