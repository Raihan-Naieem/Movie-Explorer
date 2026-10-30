import { ClapperboardIcon, Link } from "lucide-react";

export function Navbar() {
  return (
    <>
      <div className="flex justify-between px-2 py-2 items-center">
        <a href="/">
          <div className="bg-red-400 flex items-center gap-2">
            <ClapperboardIcon className="shrink-0 size-8" />
            <p className="hidden md:block">Movie Explorer</p>
          </div>
        </a>
        <div className="bg-green-400">
          <a href="#">Movies</a>
        </div>
      </div>
    </>
  );
}
