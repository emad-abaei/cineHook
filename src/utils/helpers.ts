import { MovieOptions, WatchedMovieType } from '../types';

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

export const calcAverage = (
  watched: WatchedMovieType[],
  option: MovieOptions
): string =>
  average(
    watched
      .map((movie) => movie[option])
      .filter((val) => typeof val === 'number' && !isNaN(val))
  ).toFixed(option === 'runtime' ? 0 : 1);
