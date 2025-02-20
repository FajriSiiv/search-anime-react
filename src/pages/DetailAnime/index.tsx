import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAnimeByID } from "../../api/animeAPi";
import { FaStar, FaUser } from "react-icons/fa";

const DetailAnime = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  const fetchDetailAnime = async () => {
    try {
      const res = await getAnimeByID(id);

      setAnime(res.data);
      console.log(anime);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchDetailAnime();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-10 py-5">
      <button
        className="border px-4 py-2 rounded-md bg-rose-500 text-white "
        onClick={() => {
          history(-1);
        }}
      >
        Back
      </button>
      <div className="flex gap-4 py-10 flex-col lg:flex-row">
        <div className="col-span-2 min-w-[400px]">
          <img
            src={anime.images.jpg.large_image_url}
            alt=""
            className="aspect-square mx-auto"
          />
        </div>
        <div className="col-span-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-3xl">{anime.title}</h1>
            <p
              className={`text-sm capitalize p-2  text-white font-semibold rounded-md ${
                !anime.airing ? "bg-emerald-500" : "bg-rose-500"
              }`}
            >
              {anime.status}
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <div className="bg-slate-100 p-3 rounded-md flex gap-3">
              <div className="flex flex-col gap-2 bg-white p-2 rounded-md">
                <p className="text-lg text-center px-2 py-1 bg-emerald-400 leading-none capitalize">
                  score
                </p>
                <p className="text-3xl tracking-widest font-bold leading-tight text-center">
                  {anime.score}
                </p>
                <p className="text-sm flex flex-col leading-none items-center">
                  <span>{anime.scored_by.toLocaleString()}</span>
                  <span>users</span>
                </p>
              </div>
              <div className="flex flex-col justify-between p-3">
                <div className="flex gap-5">
                  <p className="text-xl font-semibold capitalize">
                    Ranked #{anime.rank}
                  </p>
                  <p className="text-xl font-semibold capitalize">
                    Popularity #{anime.popularity}
                  </p>
                  <p className="text-xl font-semibold capitalize">
                    Favorites #{anime.favorites.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-5 capitalize text-xs">
                  <div className="p-2 rounded-sm bg-white">
                    <p>{anime.season}</p>
                  </div>
                  <div className="w-0.5 h-full bg-rose-400"></div>
                  <div className="p-2 rounded-sm bg-white">
                    <p>{anime.type}</p>
                  </div>
                  <div className="w-0.5 h-full bg-rose-400"></div>
                  <div className="p-2 rounded-sm bg-white">
                    {anime.studios.map((studio, index) => (
                      <p key={index}>{studio.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 p-3 rounded-md flex flex-col gap-1">
              <p className="">
                <span className="font-semibold capitalize">season : </span>
                {anime.season}
              </p>
              <p className="">
                <span className="font-semibold capitalize">episodes : </span>
                {anime.episodes} - {anime.duration}
              </p>
              <p className="">
                <span className="font-semibold capitalize">rating : </span>
                {anime.rating}
              </p>
              <p className="">
                <span className="font-semibold capitalize">year : </span>
                {anime.year}
              </p>
              <div className="flex gap-2 items-center">
                <p className="">
                  <span className="font-semibold capitalize">genre : </span>
                </p>
                {anime.genres.map((genre, index) => (
                  <p key={index} className="p-1 rounded-md border bg-white">
                    {genre.name}
                  </p>
                ))}
              </div>

              <p className="">
                <span className="font-semibold capitalize">synopsis : </span>
                {anime.synopsis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAnime;
