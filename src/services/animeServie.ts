import { v7 as uuidv7 } from "uuid";
import {
  fetchAllAnimes,
  insertAnimeInDb,
  fetchAnimeById,
  deleteAnimeFromDb,
  buscarAnimes,
  updateAnimeInDb,
} from "../dataApi/animeData";

export const getAllAnimesService = async () => {
  const animes = await fetchAllAnimes();
  if (animes.length === 0) {
    const error = new Error("Nenhum anime foi encontrado.");
    (error as any).status = 404;
    throw error;
  }
  return animes;
};

interface BuscarAnimesParams {
  genero?: string;
  titulo?: string;
  ano?: string;
}

export const buscarAnimesService = async (params: BuscarAnimesParams) => {
  const animes = await buscarAnimes(params.genero, params.titulo, params.ano);

  if (!animes || animes.length === 0) {
    throw new Error("Nenhum anime foi encontrado.");
  }

  return animes;
};

export const createAnimeService = async (animeData: any) => {
  const { titulo, sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url } = animeData;

  if (!titulo || !sinopse || !genero || !numero_episodios || !status || !ano_lancamento || !imagem_url) {
    const error = new Error("Dados do anime incompletos");
    (error as any).status = 400;
    throw error;
  }

  const id = uuidv7();
  return await insertAnimeInDb({ id, ...animeData });
};

export const getAnimeByIdService = async (id: string) => {
  const anime = await fetchAnimeById(id);
  if (!anime) {
    const error = new Error("Anime não encontrado.");
    (error as any).status = 404;
    throw error;
  }
  return anime;
};

export const deleteAnimeService = async (id: string) => {
  const deletedAnime = await deleteAnimeFromDb(id);
  if (!deletedAnime) {
    const error = new Error("Anime não encontrado");
    (error as any).status = 404;
    throw error;
  }
};

export const atualizarAnimeService = async (id: string, animeData: any) => {
  const validStatus = ["em_exibicao", "finalizado", "cancelado"];

  if (
    !animeData.titulo &&
    !animeData.sinopse &&
    !animeData.genero &&
    !animeData.numero_episodios &&
    !animeData.status &&
    !animeData.ano_lancamento &&
    !animeData.imagem_url
  ) {
    const error = new Error("Nenhum campo para atualização foi fornecido.");
    (error as any).status = 400;
    throw error;
  }
  if (animeData.status && !validStatus.includes(animeData.status)) {
    const error = new Error(
      `Status inválido. Valores permitidos: ${validStatus.join(", ")}.`
    );
    (error as any).status = 400;
    throw error;
  }

  const updatedAnime = await updateAnimeInDb(id, animeData);
  if (!updatedAnime.length) {
    const error = new Error("Anime não encontrado.");
    (error as any).status = 404;
    throw error;
  }

  return updatedAnime[0];
};