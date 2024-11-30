import db from "../db/knexfile";

export const fetchAnimeById = async (animeId: string) => {
  return await db("animes").where({ id: animeId }).first();
};

export const fetchEpisodioById = async (id: string) => {
  return await db("episodios").where({ id }).first();
};

export const insertEpisodioInDb = async (episodioData: any) => {
  return await db("episodios").insert(episodioData).returning("*");
};

export const updateEpisodioInDb = async (id: string, episodioData: any) => {
  return await db("episodios").where({ id }).update(episodioData).returning("*");
};

export const fetchEpisodiosByAnimeId = async (animeId: string) => {
  return await db("episodios").where({ anime_id: animeId });
};

export const deleteEpisodioFromDb = async (id: string) => {
  return await db("episodios").where({ id }).del();
};