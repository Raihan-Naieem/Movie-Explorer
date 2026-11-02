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

const formatURL = (endPoint) => {
  const TMDB_APIKEY = "4d8d05aa62f97ac6cbf460e45e042229";
  const baseURL = "https://api.themoviedb.org/3";

  return `${baseURL}${endPoint}?api_key=${TMDB_APIKEY}`;
};

// format results
/// media_type: 'tv' or 'movie'
// first_air_date -- release_date
// name -- title

// results === list of object
const formatResults = (results) => {
  const newResults = results.map((result) => {
    return {
      id: result.id,
      title: result.title ?? result.name,
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

const fetchPageData = async (endPoint, pageTitle) => {
  try {
    const res = await fetch(formatURL(endPoint));
    if (!res.ok) throw new Error(`TMDB API ERROR: ${res.statusText}`);

    const json = await res.json();
    const results = formatResults(json.results);
    const newData = { pageTitle: `${pageTitle}`, results: results };

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

// TODO: doesnt work, check later
export const getBYKeyWords = (keyword) =>
  fetchPageData(`/search/${keyword}`, "bla bla bla");

console.log(await getPopularMovies());
