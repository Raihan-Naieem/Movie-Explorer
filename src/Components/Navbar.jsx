import { ClapperboardIcon } from "lucide-react";

export function Navbar() {
  return (
    <>
      <div className="flex justify-between px-2 py-2 items-center bg-blue-900">
        <a href="/">
          <div className="flex items-center gap-2 text-white">
            <ClapperboardIcon className="shrink-0 size-8" />
            <p className="hidden md:block">Movie Explorer</p>
          </div>
        </a>
        <div className="bg-green-400 p-2 rounded-2xl">
          <a href="#">Movies</a>
        </div>
      </div>
    </>
  );
}
