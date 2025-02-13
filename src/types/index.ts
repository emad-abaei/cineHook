export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
};

export type WatchedMovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};

export type ApiResponseType = {
  Response: 'True' | 'False';
  Search?: MovieType[];
  totalResults?: string;
  Error?: string;
};

export type ApiResponseMoiveType = {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  Ratings: RatingType[];
  Error?: string;
};

type RatingType = {
  Source: string;
  Value: string;
};

export type ViewListType = 'searchedMovies' | 'watchedMovies';

export type MovieOptions = 'imdbRating' | 'userRating' | 'runtime';
