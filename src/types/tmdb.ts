// tmdb fetch unknown

type MediaType = "tv" | "movie" | "person";

export interface TmdbRawApi {
  id: number;
  title?: string;
  name?: string;
  media_type?: MediaType;
  genre_ids: number[] | undefined;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  adult: boolean;
  poster_path: string | null;
}

export interface TmdbMedia {
  id: number;
  title: string | undefined;
  mediaType: MediaType;
  genres: string[] | undefined;
  releaseDate: string | undefined;
  rating: number;
  voteCount: number;
  summary: string;
  isSafeForWork: boolean;
  imgURL: string;
}

export interface TmdbJson {
  results: TmdbRawApi[];
  total_pages: number;
  total_results: number;
}

export interface PageData {
  pageTitle: string;
  results: TmdbMedia[];
  totalPages: number;
  totalResults: number;
}
