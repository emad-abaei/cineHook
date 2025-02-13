import { useMemo } from 'react';
import { calcAverage } from '../utils/helpers';
import { WatchedMovieType } from '../types';
import { FaStar } from 'react-icons/fa';
import { LiaStarOfLifeSolid } from 'react-icons/lia';
import { IoIosTimer } from 'react-icons/io';
import { MdFormatListNumbered } from 'react-icons/md';

interface WatchedSummaryProps {
  watched: WatchedMovieType[];
}

function WatchedSummary({ watched }: WatchedSummaryProps) {
  // prettier-ignore
  const avgImdbRating = useMemo(() => calcAverage(watched, 'imdbRating'),[watched]);
  // prettier-ignore
  const avgUserRating = useMemo(() => calcAverage(watched, 'userRating'),[watched]);
  // prettier-ignore
  const avgRuntime = useMemo(() => calcAverage(watched, 'runtime'), [watched]);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <MdFormatListNumbered size={21} />
          <span>{watched.length} movies</span>
        </p>
        <p>
          <FaStar size={16} className="icon-star" />
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <LiaStarOfLifeSolid size={18} className="icon-star" />
          <span>{avgUserRating}</span>
        </p>
        <p>
          <IoIosTimer size={18} className="icon-time" />
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
export default WatchedSummary;
