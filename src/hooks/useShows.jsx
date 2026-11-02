import { useEffect } from "react";
import { useState } from "react";
import { getTrendingShows } from "../services/TMDB.api";

export function useShows() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { pageTitle, results } = await getTrendingShows();

        setPageTitle(pageTitle);
        setShows(results);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [shows]);

  return { isLoading, error, pageTitle, shows };
}
