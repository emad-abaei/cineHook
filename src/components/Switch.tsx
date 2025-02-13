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
        >
          Searched Movies
        </span>

        <span
          className={viewList === 'watchedMovies' ? 'active' : ''}
          onClick={() => handleClick('watchedMovies')}
        >
          Watched Movies
        </span>
      </div>
    </div>
  );
}

export default Switch;
