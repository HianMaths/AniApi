import express, { Request, Response } from "express";
import db from "../db/knexfile";

const router = express.Router();

// Rota para buscar detalhes de um personagem
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const personagem = await db("personagens").where({ id }).first();
    if (!personagem) {
      res.status(404);
      throw new Error("Personagem não encontrado.");
    }
    res.status(200).json(personagem);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

// Rota para buscar personagem de um anime
router.get("/:animeId/personagens", async (req, res) => {
  try {
    const { animeId } = req.params;
    const personagens = await db("personagens").where({ anime_id: animeId });
    if (personagens.length === 0) {
      res.status(404);
      throw new Error("Nenhum personagem encontrado para este anime.");
    }
    res.status(200).json(personagens);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

// Rota para criar um personagem
import { v7 as uuidv7 } from "uuid";
router.post("/:animeId", async (req: Request, res: Response) => {
  try {
    const { animeId } = req.params;
    const { nome, descricao, imagem_url } = req.body;
    if (!nome || !descricao || !imagem_url) {
      res.status(404);
      throw new Error("Os dados do personagem estão incompletos");
    }
    const id = uuidv7();
    const newPersonagem = await db("personagens")
      .insert({
        id,
        nome,
        descricao,
        imagem_url,
        anime_id: animeId,
      })
      .returning("*");
    res.status(201).json(newPersonagem);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

// Rota para atualizar personagem
router.put("/:id/personagens", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, descricao, imagem_url } = req.body;
    if (!nome && !descricao && !imagem_url) {
      res
        .status(400)
        .json({ error: "Nenhum campo para atualização foi fornecido." });
    }
    const updatedPersonagem = await db("personagens")
      .where({ id })
      .update({
        nome,
        descricao,
        imagem_url,
      })
      .returning("*");
    if (updatedPersonagem.length === 0) {
      res.status(404).json({ error: "Personagem não encontrado." });
    }
    res.status(200).json(updatedPersonagem[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
});

// Rota para deletar personagem
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPersonagem = await db("personagens").where({ id }).del();
    if (!deletedPersonagem) {
      res.status(404);
      throw new Error("Personagem não encontrado.");
    }
    res.status(200).json("Personagem deletado com sucesso.");
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

export default router;
