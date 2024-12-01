import { Request, Response } from "express";
import {
  getAllAnimesService,
  createAnimeService,
  getAnimeByIdService,
  deleteAnimeService,
  buscarAnimesService,
  atualizarAnimeService,
} from "../services/animeServie";

export const getAllAnimes = async (req: Request, res: Response) => {
  try {
    const animes = await getAllAnimesService();
    res.status(200).json(animes);
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};

export const buscarAnimes = async (req: Request, res: Response) => {
  try {
    const { genero, titulo, ano } = req.query;

    const filtros = {
      genero: genero as string | undefined,
      titulo: titulo as string | undefined,
      ano: ano as string | undefined,
    };

    const animes = await buscarAnimesService(filtros);

    res.status(200).json(animes);
  } catch (error: any) {

    if (error.message === "O parâmetro 'ano' deve ser um número válido.") {
      res.status(400).json(error.message);
    }
    if (error.message === "Nenhum anime foi encontrado.") {
      res.status(404).json(error.message);
    }

    res.status(500).json("Erro interno ao buscar animes.");
  }
};

export const createAnime = async (req: Request, res: Response) => {
  try {
    const animeData = req.body;
    const newAnime = await createAnimeService(animeData);
    res.status(201).json(newAnime);
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};

export const getAnimeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const anime = await getAnimeByIdService(id);
    res.status(200).json(anime);
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};

export const deleteAnime = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteAnimeService(id);
    res.status(200).json("Anime deletado com sucesso.");
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};


export const atualizarAnime = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url } = req.body;

  try {
    const updatedAnime = await atualizarAnimeService(id, {
      titulo,
      sinopse,
      genero,
      numero_episodios,
      status,
      ano_lancamento,
      imagem_url,
    });

    res.status(200).json(updatedAnime);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Erro interno no servidor.";

    res.status(status).json({ message });
  }
};