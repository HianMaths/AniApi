import { Request, Response } from "express";
import {
  buscarPersonagemPorIdService,
  buscarPersonagensPorAnimeIdService,
  criarPersonagemService,
  atualizarPersonagemService,
  deletarPersonagemService,
  buscarPersonagensService,
} from "../services/personagemService";

export const buscarPersonagemPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const personagem = await buscarPersonagemPorIdService(id);
    res.status(200).json(personagem);
  } catch (error: any) {
    res.status(error.status || 404).json(error.message);
  }
};

export const buscarPersonagensPorAnimeId = async (req: Request, res: Response) => {
  try {
    const { animeId } = req.params;
    const personagens = await buscarPersonagensPorAnimeIdService(animeId);
    res.status(200).json(personagens);
  } catch (error: any) {
    res.status(error.status || 404).json(error.message);
  }
};

export const criarPersonagem = async (req: Request, res: Response) => {
  try {
    const { animeId } = req.params;
    const personagemData = req.body;
    const newPersonagem = await criarPersonagemService(animeId, personagemData);
    res.status(201).json(newPersonagem);
  } catch (error: any) {
    res.status(error.status || 404).json(error.message);
  }
};

export const atualizarPersonagem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const personagemData = req.body;
    const updatedPersonagem = await atualizarPersonagemService(id, personagemData);
    res.status(200).json(updatedPersonagem);
  } catch (error: any) {
    res.status(error.status || 404).json(error.message);
  }
};

export const deletarPersonagem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deletarPersonagemService(id);
    res.status(200).json("Personagem deletado com sucesso.");
  } catch (error: any) {
    res.status(error.status || 404).json(error.message);
  }
};

export const buscarPersonagens = async (req: Request, res: Response) => {
  try {
    const { nome, descricao } = req.query;

    const filtros = {
      nome: nome as string | undefined,
      descricao: descricao as string | undefined,
    };

    const personagens = await buscarPersonagensService(filtros);

    res.status(200).json(personagens);
  } catch (error: any) {
    console.error("Erro ao buscar personagens:", error);

    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro interno ao buscar personagens." });
    }
  }
};