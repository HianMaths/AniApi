import { v7 as uuidv7 } from "uuid";
import {
  fetchAnimeById,
  fetchEpisodioById,
  insertEpisodioInDb,
  updateEpisodioInDb,
  fetchEpisodiosByAnimeId,
  deleteEpisodioFromDb,
} from "../dataApi/episodioData";

export const criarEpisodioService = async (animeId: string, episodioData: any) => {
  const { titulo, descricao, numero } = episodioData;

  if (!titulo || !descricao || !numero) {
    const error = new Error("Dados faltantes");
    (error as any).status = 400;
    throw error;
  }

  const animeExists = await fetchAnimeById(animeId);
  if (!animeExists) {
    const error = new Error("Anime não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  const id = uuidv7();
  return await insertEpisodioInDb({ id, anime_id: animeId, titulo, descricao, numero });
};

export const buscarEpisodioPorIdService = async (id: string) => {
  const episodio = await fetchEpisodioById(id);
  if (!episodio) {
    const error = new Error("Episódio não encontrado.");
    (error as any).status = 404;
    throw error;
  }
  return episodio;
};

export const atualizarEpisodioService = async (id: string, episodioData: any) => {
  if (!episodioData.titulo && !episodioData.numero && !episodioData.descricao) {
    const error = new Error("Nenhum campo para atualização foi fornecido.");
    (error as any).status = 400;
    throw error;
  }

  const updatedEpisodio = await updateEpisodioInDb(id, episodioData);
  if (!updatedEpisodio) {
    const error = new Error("Episódio não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  return updatedEpisodio;
};

export const buscarEpisodiosPorAnimeIdService = async (animeId: string) => {
  const animeExists = await fetchAnimeById(animeId);
  if (!animeExists) {
    const error = new Error("Anime não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  return await fetchEpisodiosByAnimeId(animeId);
};

export const deletarEpisodioService = async (id: string) => {
  const episodio = await fetchEpisodioById(id);
  if (!episodio) {
    const error = new Error("Episódio não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  return await deleteEpisodioFromDb(id);
};
