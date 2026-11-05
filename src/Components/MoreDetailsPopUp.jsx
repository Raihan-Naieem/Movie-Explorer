import { X } from "lucide-react";

export function MoreDetailsPopUp({
  title,
  genres,
  releaseDate,
  rating,
  voteCount,
  isSafeForWork,
  summary,
  imgURL,
  onClose,
}) {
  const stopEventPropagation = (event) => event.stopPropagation();
  return (
    <>
      {/* onClose on backdrop, event propagation stops after that */}
      <div
        className="backdrop-blur-xl bg-black/50 fixed inset-0 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="h-100 w-200 rounded-4xl bg-cover bg-center overflow-hidden border-2 back relative mx-6"
          style={{ backgroundImage: `url("${imgURL}")` }}
          onClick={stopEventPropagation}
        >
          <div className="flex flex-col text-gray-300 backdrop-blur-[1px] bg-black/70 absolute inset-0 px-10 py-6">
            <button
              className="self-end shrink-0 hover:bg-white/20 rounded-xl p-2 "
              type="button"
              onClick={onClose}
            >
              <X />
            </button>
            <div className="flex flex-col grow gap-4  ">
              <h1 className="font-extrabold sm:text-4xl text-2xl underline">
                {title}
              </h1>

              <div className="sm:text-2xl text-md overflow-y-auto max-h-70 pb-8">
                <div className="flex gap-x-2">
                  <div className="font-medium">
                    <p>Rating: </p>
                    <p>Release: </p>
                    <p>NSFW: </p>
                    <p>Genres: </p>
                  </div>
                  <div>
                    <p>
                      {rating} ({voteCount})
                    </p>
                    <p> {releaseDate}</p>
                    <p> {isSafeForWork ? "no" : "yes"}</p>
                    <p> {genres.join(" , ")} </p>
                  </div>
                </div>
                <p className="font-medium">Overview:</p>
                <p>{summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
