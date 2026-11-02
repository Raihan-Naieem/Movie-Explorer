import { Card } from "./Card";
import { useShows } from "../hooks/useShows.jsx";

export function Shows() {
  const { pageTitle, shows, isLoading, error } = useShows();

  // const [isOpen, setIsOpen] = useState(false);

  if (error)
    return (
      <p className="min-h-dvh flex justify-center items-center border rounded-2xl bg-pink-400 text-4xl">
        ${error}
      </p>
    );
  if (isLoading)
    return (
      <p className="min-h-dvh flex justify-center items-center border rounded-2xl bg-pink-400 text-4xl">
        Loading...
      </p>
    );
  return (
    <>
      <h1 className="text-3xl font-extrabold text-center text-gray-100 pt-4">
        {pageTitle}
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-min gap-8 min-h-dvh m-8">
        {shows.map((show) => {
          return (
            <Card
              key={show.id}
              title={show.title}
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
