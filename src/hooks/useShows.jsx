import { useEffect } from "react";
import { useState } from "react";
import {
  getMoviesAndShowsByKeyWord,
  getTrendingShows,
} from "../services/TMDB.api";
import { useSearchParams } from "react-router";

export function useShows() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [pageTitle, setPageTitle] = useState("");
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError("");

        if (searchTerm) {
          const { pageTitle, results } =
            await getMoviesAndShowsByKeyWord(searchTerm);
          setPageTitle(pageTitle);
          setShows(results);
        } else {
          const { pageTitle, results } = await getTrendingShows();
          setPageTitle(pageTitle);
          setShows(results);
          console.log(results);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchTerm]);

  return { isLoading, error, pageTitle, shows };
}
