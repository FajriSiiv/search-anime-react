import React, { useEffect, useState } from "react";
import { getPopularThisSeasons } from "../api/animeAPi";
import CardComponents from "./Card/CardComponents";
import ApiQueue from "../lib/QueueAPi";

const AnimePopularSeasons = () => {
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAnimes = async () => {
    setLoading(true);
    try {
      const data = await getPopularThisSeasons();
      setAnimes((prev) => [...prev, ...data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const animeApiQueue = new ApiQueue<any>();

  const enqueueLoadAnimes = () => {
    animeApiQueue.enqueue(loadAnimes);
  };

  useEffect(() => {
    enqueueLoadAnimes();
  }, []);

  return (
    <div className="flex gap-y-5 flex-col">
      <div className="flex justify-between w-full">
        <p className="text-2xl font-bold ">Popular This Season</p>
        <p>View All</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {animes.slice(0, 3).map((anime: any, index) => (
          <CardComponents loading={loading} anime={anime} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AnimePopularSeasons;
