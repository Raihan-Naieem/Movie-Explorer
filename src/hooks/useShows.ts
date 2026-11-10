import { useEffect } from "react";
import { useState } from "react";
import {
  getMoviesAndShowsByKeyWord,
  getTrendingShows,
} from "../services/TMDB.api";
import { useSearchParams } from "react-router";
import type { TmdbMedia } from "../types/tmdb";

interface UseShowsReturns {
  isLoading: boolean;
  error: string;
  pageTitle: string;
  shows: TmdbMedia[];
}

export function useShows(): UseShowsReturns {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [pageTitle, setPageTitle] = useState("");
  const [shows, setShows] = useState<TmdbMedia[]>([]);
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
        if (err instanceof Error) {
          console.log(err.message);
          setError(err.message);
        } else {
          console.log("Unknows error from useShows.ts");
          setError("Unknows error from useShows.ts");
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchTerm]);

  return { isLoading, error, pageTitle, shows };
}
