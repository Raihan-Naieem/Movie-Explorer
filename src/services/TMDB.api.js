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

import { Genres } from "../utils/Genre.enum";

const formatURL = (endPoint, query = "") => {
  const TMDB_APIKEY = import.meta.env.VITE_TMDB_APIKEY;
  const baseURL = "https://api.themoviedb.org/3";

  return query
    ? `${baseURL}${endPoint}?query=${query}&api_key=${TMDB_APIKEY}`
    : `${baseURL}${endPoint}?api_key=${TMDB_APIKEY}`;
};

const findGenres = (genreIds) => {
  // let genreNames = [] // list of {id: , name:}
  try {
    const genreNames = Genres.filter((genre) =>
      genreIds.includes(genre.id),
    ).map((genre) => genre.name);

    return [...new Set(genreNames.sort())]; // excludes duplicates
  } catch (error) {
    console.log(error);
  }
};

// results === list of object
const formatResults = (results) => {
  const newResults = results.map((result) => {
    return {
      id: result.id,
      title: result.title ?? result.name,
      mediaType: result.media_type || (result.title ? "tv" : "movie"), // sometime responce have undefine media_type
      genres: findGenres(result.genre_ids),
      releaseDate: result.release_date ?? result.first_air_date,
      rating: result.vote_average,
      voteCount: result.vote_count,
      summary: result.overview,
      isSafeForWork: result.adult,
      imgURL: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
    };
  });

  return newResults;
};

const fetchPageData = async (endPoint, pageTitle, query = "") => {
  try {
    console.log(`formaturl: ${formatURL(endPoint, query)}`);
    const responce = await fetch(formatURL(endPoint, query));
    if (!responce.ok) throw new Error(`TMDB API ERROR: ${responce.statusText}`);

    const json = await responce.json();
    console.log(json);
    const results = formatResults(json.results);
    const { total_pages, total_results } = json;
    const newData = {
      pageTitle: `${pageTitle} \n total results (${total_results})`,
      results: results,
      totalPages: Number(total_pages),
      totalResults: Number(total_results),
    };

    console.log(newData);
    return newData;
  } catch (err) {
    console.log(err);
  }
};

export const getPopularShows = () =>
  fetchPageData("/tv/popular", "Popular Tv Shows 📺 ");

export const getTrendingShows = () =>
  fetchPageData("/trending/tv/week", "Trending shows this week");

export const getPopularMovies = () =>
  fetchPageData("/movie/popular", "Popular Movies 🎬");

export const getTrendingMovies = () =>
  fetchPageData("/trending/movie/week", "Trending movies this week");

export const getShowsBYKeyWord = (keyword) => {
  return fetchPageData(
    `/search/tv`,
    `${keyword} name`,
    encodeURIComponent(keyword),
  );
};

export const getMoviesBYKeyWord = (keyword) => {
  return fetchPageData(
    `/search/movie`,
    `${keyword} name`,
    encodeURIComponent(keyword),
  );
};

export const getMoviesAndShowsByKeyWord = (keyword) => {
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
// console.log(await getMoviesAndShowsByKeyWord("batman"));
