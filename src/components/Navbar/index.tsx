import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-10 justify-start items-end px-10 py-5 bg-sky-500 text-white">
      <h1 className="font-semibold text-3xl">NimeList</h1>
      <div className="flex gap-5 text-lg">
        <span>Anime</span>
        <span>Comic</span>
        <span>Characters</span>
      </div>
    </div>
  );
};

export default Navbar;
