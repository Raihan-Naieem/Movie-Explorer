import { X } from "lucide-react";

export function MoreDetailsPopUp({ title, summary, imgURL, onClose }) {
  return (
    <>
      <div className="backdrop-blur-xl bg-black/50 fixed inset-0 flex justify-center items-center">
        <div
          className="h-100 w-200 bg-amber-600 rounded-4xl bg-cover bg-center overflow-hidden border-2 back relative"
          style={{ backgroundImage: `url("${imgURL}")` }}
        >
          <div className="flex flex-col gap-16  p-6 items-center text-gray-100 backdrop-blur-[1px] bg-black/30 absolute inset-0">
            <button
              className="self-end hover:bg-white/20 rounded-xl p-2"
              type="button"
              onClick={onClose}
            >
              <X />
            </button>
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 className="font-extrabold text-4xl underline">{title}</h1>
              <p className="text-2xl">{summary}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
