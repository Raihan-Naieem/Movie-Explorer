import { ClapperboardIcon } from "lucide-react";
import { useLocation } from "react-router";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex justify-between px-2 py-2 items-center bg-blue-900">
        <a href="/">
          <div className="flex items-center gap-2 text-white hover:scale-110 transition-all duration-200">
            <ClapperboardIcon className="shrink-0 size-8" />
            <p className="hidden md:block">Movie Explorer</p>
          </div>
        </a>

        {pathname !== "/" && <SearchBar />}

        <div className="bg-green-800 text-gray-300 p-2 text-sm sm:text-md sm:px-6 sm:py-2 hover:scale-110 transition-all duration-200 rounded-2xl">
          <a href="/shows">Movies</a>
        </div>
      </div>
    </>
  );
}
