import { Socials } from "./Socials";

export function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-center py-2 bg-blue-800 text-gray-300">
        <Socials />
        <div className="flex justify-center items-center text-sm ">
          Copyright (c) 2026 Raihan-Naieem. All Rights Reserved.
        </div>
      </div>
    </>
  );
}
