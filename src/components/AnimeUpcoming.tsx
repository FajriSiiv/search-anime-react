import React, { useEffect, useState } from "react";
import { getAnimeUpcoming } from "../api/animeAPi";
import CardComponents from "./Card/CardComponents";
import ApiQueue from "../lib/QueueAPi";
import LoadingCard from "./Loading/loadingCard";

const AnimeUpcomingComponents = () => {
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAnimes = async () => {
    setLoading(true);
    try {
      const data = await getAnimeUpcoming();
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
        <p className="text-2xl font-bold ">Anime Upcoming</p>
        <p>View All</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((card, index) => (
          <LoadingCard />
        ))}
        {animes.slice(0, 3).map((anime: any, index) => (
          <CardComponents loading={loading} anime={anime} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AnimeUpcomingComponents;
