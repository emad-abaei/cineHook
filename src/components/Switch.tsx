import { ViewListType } from '../types';

interface SwitchProps {
  viewList: ViewListType;
  onChangeViewList: (viewList: ViewListType) => void;
}

function Switch({ viewList, onChangeViewList }: SwitchProps) {
  function handleClick(view: ViewListType) {
    if (view === viewList) return;
    onChangeViewList(view);
  }

  return (
    <div className="switch">
      <div className="container">
        <span
          className={viewList === 'searchedMovies' ? 'active' : ''}
          onClick={() => handleClick('searchedMovies')}
          aria-label={`Switch to ${
            viewList === 'searchedMovies' ? 'watched movies' : 'searched movies'
          }`}
        >
          Searched Movies
        </span>

        <span
          className={viewList === 'watchedMovies' ? 'active' : ''}
          onClick={() => handleClick('watchedMovies')}
          aria-label={`Switch to ${
            viewList === 'searchedMovies' ? 'watched movies' : 'searched movies'
          }`}
        >
          Watched Movies
        </span>
      </div>
    </div>
  );
}

export default Switch;
