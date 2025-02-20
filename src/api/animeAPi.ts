const BASE_URL = "https://api.jikan.moe/v4";

export const getTopAnimes = async (page = 1, filter?, type?) => {
  const response = await fetch(
    `${BASE_URL}/top/anime?${page > 1 ? `page=${page}` : ""}${
      filter ? `&filter=${filter}` : ""
    }${type ? `&type=${type}` : ""}&sfw=true`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }
  return await response.json();
};

export const getTopRecentAnimes = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/top/anime?filter=airing&${
      page > 1 ? `page=${page}` : ""
    }&sfw=true`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }
  return await response.json();
};

export const getPopularThisSeasons = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/seasons/now${page > 1 ? `?page=${page}` : ""}&sfw=true`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }
  return await response.json();
};

export const getAnimeUpcoming = async () => {
  const response = await fetch(`${BASE_URL}/seasons/upcoming?&sfw=true`);
  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }
  return await response.json();
};

export const getSearchAnime = async (page = 1, searchAnime?, genres?) => {
  const response = await fetch(
    `${BASE_URL}/anime?q=${searchAnime}&page=${page}&sfw=true${
      genres || genres <= 0 ? `&genres=${genres}` : ""
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }
  return await response.json();
};

export const getGenresAnime = async () => {
  const response = await fetch(`${BASE_URL}/genres/anime`);
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  return await response.json();
};

// Detail Anime By ID

export const getAnimeByID = async (id) => {
  const response = await fetch(`${BASE_URL}/anime/${id}/full`);
  if (!response.ok) {
    throw new Error("Failed to fetch details anime");
  }
  return await response.json();
};
