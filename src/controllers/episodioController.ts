import { Request, Response } from "express";
import {
  criarEpisodioService,
  buscarEpisodioPorIdService,
  atualizarEpisodioService,
  buscarEpisodiosPorAnimeIdService,
  deletarEpisodioService,
} from "../services/episodioService";

export const criarEpisodio = async (req: Request, res: Response) => {
  const { animeId } = req.params;
  const { titulo, descricao, numero } = req.body;

  try {
    const novoEpisodio = await criarEpisodioService(animeId, { titulo, descricao, numero });
    res.status(201).json({
      message: "Episódio adicionado com sucesso.",
      episodio: novoEpisodio,
    });
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};

export const buscarEpisodioPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const episodio = await buscarEpisodioPorIdService(id);
    res.status(200).json(episodio);
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};

export const atualizarEpisodio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, numero, descricao } = req.body;

  try {
    const updatedEpisodio = await atualizarEpisodioService(id, { titulo, numero, descricao });

     res.status(200).json(updatedEpisodio);
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Erro interno no servidor.";

  res.status(status).json({ message });
  }
};

export const buscarEpisodiosPorAnimeId = async (req: Request, res: Response) => {
  const { animeId } = req.params;

  try {
    const episodios = await buscarEpisodiosPorAnimeIdService(animeId);
    res.status(200).json(episodios);
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};

export const deletarEpisodio = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deletarEpisodioService(id);
    res.status(200).json({ message: "Episódio deletado com sucesso." });
  } catch (error: any) {
    res.status(error.status || 500).json(error.message);
  }
};