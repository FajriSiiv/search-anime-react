import React from "react";
import { FaUser } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { VscCircleFilled } from "react-icons/vsc";
import { useNavigate } from "react-router";

const CardComponents = ({ anime, loading = false }) => {
  const history = useNavigate();

  const handleClick = (id) => {
    history("/anime/" + id);
  };

  return (
    <>
      <div
        className="grid grid-cols-7 gap-4 p-3 rounded-md h-[280px] overflow-hidden border"
        onClick={() => handleClick(anime.mal_id)}
      >
        <div className="col-span-3 overflow-hidden rounded-md w-full h-full">
          <img
            src={anime.images.jpg.large_image_url}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="col-span-4 flex flex-col gap-y-2">
          <p
            className={`capitalize px-2 py-1 border text-lg rounded-md w-fit ${
              anime.status === "Finished Airing"
                ? "border-emerald-500 text-emerald-500"
                : "border-rose-500 text-rose-500"
            }`}
          >
            {anime.status}
          </p>
          <div className="flex items-center gap-5 text-sm">
            <div className="flex gap-1 ">
              <p className="capitalize">
                {anime.season === null ? "-" : anime.season} {anime.year}
              </p>
            </div>
            {anime.episodes && (
              <div className="flex items-center">
                <VscCircleFilled size={20} className=" text-emerald-600" />
                <p>
                  {anime.episodes === null ? "-" : `${anime.episodes} episodes`}
                </p>
              </div>
            )}
          </div>
          <p className="text-xl font-semibold">{anime.title.slice(0, 45)}</p>
          {anime.score && anime.score_by && (
            <div className="flex gap-x-5">
              <div className="flex gap-1 items-center">
                <TiStarFullOutline size={25} className="text-yellow-500" />
                <p className="text-lg">{anime.score}</p>
              </div>
              <div className="flex gap-1 items-center">
                <FaUser size={18} className="text-blue-500" />
                <p className="text-lg">{anime.scored_by} users</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {anime.genres.slice(0, 3).map((genre, index) => (
              <p className="px-2 py-1 border rounded-md capitalize" key={index}>
                {genre.name}
              </p>
            ))}
            {anime.genres.length > 3 && (
              <p className="px-2 py-1 border rounded-md capitalize">
                +{anime.genres.length - 3}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponents;
