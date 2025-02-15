import { useEffect, useRef, ChangeEvent } from 'react';
import { useKey } from '../hooks/useKey';

interface SearchProps {
  query: string;
  onSetQuery: (val: string) => void;
}

function Search({ query, onSetQuery }: SearchProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    onSetQuery(e.target.value);
  }

  const searchInputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchInputEl.current?.focus();
  }, []);

  useKey('Enter', function (): void {
    if (document.activeElement === searchInputEl.current) return;
    searchInputEl.current?.focus();
    onSetQuery('');
  });

  return (
    <>
      <label htmlFor="search" className="visually-hidden">
        Search Movies
      </label>
      <input
        id="search"
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        ref={searchInputEl}
        aria-label="Search for movies"
      />
    </>
  );
}

export default Search;
