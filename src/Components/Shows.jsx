import { Card } from "./Card";
import { useShows } from "../hooks/useShows.jsx";

export function Shows() {
  const { pageTitle, shows, isLoading, error } = useShows();

  if (error)
    return (
      <p className="min-h-dvh flex justify-center items-center rounded-2xl bg-blue-700 text-8xl text-red-600">
        ${error}
      </p>
    );
  if (isLoading)
    return (
      <p className="min-h-dvh flex justify-center items-center rounded-2xl bg-blue-700 text-8xl text-white">
        Loading...
      </p>
    );
  return (
    <>
      <h1 className="text-xl sm:text-3xl font-extrabold text-center text-gray-100 pt-4">
        {pageTitle ? <p>{pageTitle}</p> : <p>0 search results</p>}
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-min gap-8 min-h-dvh m-8">
        {shows.map((show) => {
          return (
            <Card
              key={show.id}
              title={show.title}
              mediaType={show.mediaType}
              genres={show.genres}
              releaseDate={show.releaseDate}
              rating={show.rating}
              voteCount={show.voteCount}
              isSafeForWork={show.isSafeForWork}
              summary={show.summary}
              imgURL={show.imgURL}
            />
          );
        })}
      </div>
    </>
  );
}
