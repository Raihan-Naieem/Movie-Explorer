import { Socials } from "./Socials";

export function Footer() {
  return (
    <>
      <div className="flex flex-col sm:gap-4 justify-center py-4 bg-blue-800 text-gray-300">
        <Socials />
        <div className="flex justify-center items-center text-sm sm:text-lg ">
          Copyright (c) 2026 Raihan-Naieem. All Rights Reserved.
        </div>
      </div>
    </>
  );
}
