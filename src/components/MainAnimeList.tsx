import React, { useEffect, useState } from "react";
import {
  getPopularThisSeasons,
  getSearchAnime,
  getTopAnimes,
  getTopRecentAnimes,
} from "../api/animeAPi";
import CardComponents from "./Card/CardComponents";
import LoadingCard from "./LoadingCard";

interface PropsMainAnime {
  page: number;
  loading: boolean;
  setLoading: (value: boolean) => void;
  category: string;
  searchAnime: string;
  booleanSearch: boolean;
  setBooleanSearch: (value: boolean) => void;
  setAnimes: (string) => void;
  animes: string[];
  genre: number;
}

const MainAnimeList = ({
  page,
  loading,
  setLoading,
  category,
  searchAnime,
  booleanSearch,
  setBooleanSearch,
  animes,
  setAnimes,
  genre,
}: PropsMainAnime) => {
  const loadAnimes = async () => {
    setLoading(true);

    try {
      let data: any = [];

      if (category === "top" && searchAnime === "" && genre <= 0) {
        data = await getTopAnimes(page, "bypopularity");
        console.log("hello");
      } else if (
        category === "top-recent" &&
        searchAnime === "" &&
        genre <= 0
      ) {
        data = await getTopRecentAnimes(page);
      } else if (
        category === "popular-season" &&
        searchAnime === "" &&
        genre <= 0
      ) {
        data = await getPopularThisSeasons(page);
      } else if (category === "top-movie" && searchAnime === "" && genre <= 0) {
        data = await getTopAnimes(page, "bypopularity", "movie");
      } else if (category === "fav-anime" && searchAnime === "" && genre <= 0) {
        data = await getTopAnimes(page, "favorite");
      } else if (searchAnime !== "" || genre >= 0) {
        setBooleanSearch(false);
        data = await getSearchAnime(page, searchAnime, genre);
      }

      setAnimes(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadAnimes();
  }, [page, category, genre, booleanSearch, setBooleanSearch]);

  return (
    <div className="flex gap-y-5 flex-col">
      <div className="grid lg:grid-cols-3  gap-5 h-full grid-cols-1 md:grid-cols-2">
        {animes.length === 0 && !loading ? (
          <p className="text-center font-semibold text-3xl">Can't find anime</p>
        ) : loading ? (
          [...Array(6)].map((_, index) => <LoadingCard key={index} />)
        ) : (
          animes.map((anime: any, index) => (
            <CardComponents anime={anime} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainAnimeList;
