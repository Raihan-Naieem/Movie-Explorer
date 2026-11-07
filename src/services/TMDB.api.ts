// GET search/shows?q=girls
// GET /shows

// TMDB api doc
// 	/trending/movie/week
// 	/trending/tv/week
// 	/movie/popular
// 	/tv/popular
// 	/search/multi
// 	/movie/{id}
// 	/tv/{id}
// 	/movie/{id}/credits
// 	/movie/{id}/videos
// 	/movie/{id}/recommendations

import type { PageData, TmdbJson, TmdbMedia, TmdbRawApi } from "../types/tmdb";
import { Genres } from "../utils/Genre.enum";

const formatURL = (endPoint: string, query: string = ""): string => {
  const TMDB_APIKEY = import.meta.env.VITE_TMDB_APIKEY;
  const baseURL = "https://api.themoviedb.org/3";

  return query
    ? `${baseURL}${endPoint}?query=${query}&api_key=${TMDB_APIKEY}`
    : `${baseURL}${endPoint}?api_key=${TMDB_APIKEY}`;
};

const findGenres = (genreIds: number[] | undefined): string[] | undefined => {
	if(!genreIds) return undefined;
  const genreNames = Genres.filter((genre) => genreIds.includes(genre.id)).map(
    (genre) => genre.name,
  );

  return [...new Set(genreNames.sort())];
};

// results === list of object
const formatResults = (results: TmdbRawApi[]): TmdbMedia[] => {
  const newResults = results.map((result) => {
    return {
      id: result.id,
      title: result.title ?? result.name,
      mediaType: result.media_type || (result.title ? "movie" : "tv"), // sometime responce have undefine media_type
      genres: findGenres(result.genre_ids),
      releaseDate: result.release_date ?? result.first_air_date,
      rating: result.vote_average,
      voteCount: result.vote_count,
      summary: result.overview,
      isSafeForWork: result.adult,
      imgURL: result.poster_path
        ? `https://image.tmdb.org/t/p/original/${result.poster_path}`
        : "",
    };
  });
  return newResults;
};

const fetchPageData = async (
  endPoint: string,
  pageTitle: string,
  query: string = "",
): Promise<PageData> => {
  try {
    console.log(`formaturl: ${formatURL(endPoint, query)}`);
    const responce: Response = await fetch(formatURL(endPoint, query));
    if (!responce.ok) throw new Error(`TMDB API ERROR: ${responce.statusText}`);

    const json = (await responce.json()) as TmdbJson;
    const results = formatResults(json.results);
    const newData: PageData = {
      pageTitle: `${pageTitle} \n total results (${json.total_results})`,
      results: results,
      totalPages: json.total_pages,
      totalResults: json.total_results,
    };

    console.log(newData);
    return newData;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`TMDB API ERROR: ${error.message} `);
    } else {
      console.log(`TMDB API ERROR: unknown `);
    }

    throw error;
  }
};

export const getPopularShows = (): Promise<PageData> =>
  fetchPageData("/tv/popular", "Popular Tv Shows 📺 ");

export const getTrendingShows = (): Promise<PageData> =>
  fetchPageData("/trending/tv/week", "Trending shows this week");

export const getPopularMovies = (): Promise<PageData> =>
  fetchPageData("/movie/popular", "Popular Movies 🎬");

export const getTrendingMovies = (): Promise<PageData> =>
  fetchPageData("/trending/movie/week", "Trending movies this week");

export const getShowsBYKeyWord = (keyword: string): Promise<PageData> => {
  return fetchPageData(
    `/search/tv`,
    `${keyword} name`,
    encodeURIComponent(keyword),
  );
};

export const getMoviesBYKeyWord = (keyword: string): Promise<PageData> => {
  return fetchPageData(
    `/search/movie`,
    `${keyword} name`,
    encodeURIComponent(keyword),
  );
};

export const getMoviesAndShowsByKeyWord = (
  keyword: string,
): Promise<PageData> => {
  return fetchPageData(
    `/search/multi`,
    `${keyword} name`,
    encodeURIComponent(keyword),
  );
};

// tests
// console.log(formatURL("/search/tv", "house"));
// console.log(formatURL("/search/movie", "batman"));
// console.log(await getMoviesBYKeyWord("batman"));
console.log(await getMoviesAndShowsByKeyWord("dajjal"));
