import React, { useEffect, useState } from "react";
import BasicButton from "../components/Button/BasicButton";
import MainAnimeList from "../components/MainAnimeList";
import { useNavigate, useLocation } from "react-router";
import { Input, Label, Select } from "@headlessui/react";
import { getGenresAnime } from "../api/animeAPi";

const animeCategory = [
  { name: "Top Anime", value: "top" },
  { name: "Favorite Anime", value: "fav-anime" },
  { name: "Popular This Season", value: "popular-season" },
  { name: "Top Recent", value: "top-recent" },
  { name: "Top Movie", value: "top-movie" },
];

const Homepage = () => {
  const history = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(queryParams.get("anime") || "top");
  const [searchAnime, setSearchAnime] = useState(
    queryParams.get("search") || ""
  );
  const [booleanSearch, setBooleanSearch] = useState(false);
  const [genres, setGenres] = useState<any[]>([]);
  const [seletedGenre, setSeletedGenre] = useState(0);
  const [genre, setGenre] = useState(0);

  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);

  const handleCategoryAnime = (event) => {
    setPage(1);
    setSearchAnime("");
    setGenre(0);

    setCategory(event.target.value);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSearchAnime = (event) => {
    event.preventDefault();
    setPage(1);
    setBooleanSearch(true);
    setGenre(seletedGenre);
  };

  const fetchGenresAnime = async () => {
    try {
      const res = await getGenresAnime();

      setGenres(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchGenresAnime();

    const params = new URLSearchParams();
    if (page) params.set("page", page.toString());
    if (category && searchAnime === "" && genre <= 0)
      params.set("anime", category);
    if (searchAnime) {
      params.set("search", searchAnime);
    }
    if (genre) {
      params.set("genre", genre.toString());
    }

    history({ search: params.toString() });
  }, [page, history, category, searchAnime, genre]);

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex gap-5">
        <div className="flex flex-col gap-y-2">
          <label className="text-sm/6 font-medium ">Category Anime</label>
          <Select
            name="category"
            aria-label="Select Category"
            className="p-2 rounded-md border max-w-72"
            value={category}
            onChange={handleCategoryAnime}
            disabled={loading}
          >
            {animeCategory.map((cate, index) => (
              <option key={index} value={cate.value}>
                {cate.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <form className="flex  items-end gap-5 " onSubmit={handleSearchAnime}>
        <div className="flex flex-col gap-y-2">
          <label className="text-sm/6 font-medium ">Genre Anime</label>
          <Input
            className=" block w-full rounded-lg bg-white/5 py-1.5 px-3 text-sm/6 border-black/50 border md:max-w-[500px]"
            placeholder="Type 'Attack On Titan' "
            value={searchAnime}
            onChange={(e) => setSearchAnime(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="text-sm/6 font-medium ">Genre Anime</label>
          <Select
            name="genre"
            aria-label="Select Genre"
            className="py-1.5 px-2 rounded-md border max-w-72"
            value={seletedGenre}
            onChange={(e) => setSeletedGenre(parseInt(e.target.value))}
            disabled={loading}
          >
            <option value={0}>Select a Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.mal_id}>
                {genre.name}
              </option>
            ))}
          </Select>
        </div>
        <BasicButton
          type="submit"
          name="Search Anime"
          className="w-full md:w-fit"
        />
      </form>

      <MainAnimeList
        category={category}
        loading={loading}
        setLoading={setLoading}
        page={page}
        searchAnime={searchAnime}
        booleanSearch={booleanSearch}
        setBooleanSearch={setBooleanSearch}
        animes={animes}
        setAnimes={setAnimes}
        genre={genre}
      />

      {animes.length === 0 ? (
        ""
      ) : (
        <div className="flex gap-x-5 items-center place-content-end">
          <BasicButton
            name="Prev"
            onClick={handlePrev}
            disabled={loading || animes.length === 0 || page <= 1}
          />
          <span>{page}</span>
          <BasicButton
            name="Next"
            onClick={handleNext}
            disabled={loading || animes.length === 0 || animes.length < 25}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
