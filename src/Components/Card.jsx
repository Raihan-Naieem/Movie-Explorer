// props returns
//     return {
//       id: result.id,
//       title: result.title ?? result.name,
//       releaseDate: result.release_date ?? result.first_air_date,
//       rating: result.vote_average,
//       voteCount: result.vote_count,
//       summary: result.overview,
//       isSafeForWork: result.adult,
//       imgURL: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
//     };

import { useState } from "react";
import { MoreDetailsPopUp } from "./MoreDetailsPopUp";

export function Card({
  title,
  mediaType,
  genres,
  releaseDate,
  rating,
  voteCount,
  isSafeForWork,
  summary,
  imgURL,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 border-2 rounded-2xl px-6 py-4 bg-yellow-800/50">
        <img
          className={`h-full aspect-2/3 rounded-4xl border-2`}
          src={encodeURI(imgURL)}
          alt={`${title}.img`}
        />
        <div className="h-full flex flex-col justify-center items-center text-gray-100">
          <div>
            <div>
              <span className="font-bold">Title: </span> {title}
            </div>
            <div>
              <span className="font-bold">Media: </span> {mediaType}
            </div>
            <div>
              <span className="font-bold">Release: </span> {releaseDate}
            </div>
            <div>
              <span className="font-bold">Rating: </span> {rating} ({voteCount})
            </div>
          </div>
        </div>
        <div className="">
          <button
            className="bg-yellow-800 rounded-2xl p-2 mb-4 text-gray-100 text-xl hover:scale-110  border 
					             border-black transition-all duration-200 cursor-pointer"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            more details
          </button>
        </div>
      </div>

      {isOpen && (
        <MoreDetailsPopUp
          title={title}
          mediaType={mediaType}
          genres={genres}
          releaseDate={releaseDate}
          rating={rating}
          voteCount={voteCount}
          isSafeForWork={isSafeForWork}
          summary={summary}
          imgURL={imgURL}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
