import express, { Request, Response } from "express";
import { v7 as uuidv7 } from 'uuid';
import db from "../db/knexfile";

const router = express.Router();

// ROTA PARA ACESSAR OS DETALHES DE UM EPISÓDIO PELO ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const episodio = await db("episodios").where({ id }).first();

    if (!episodio) {
       res.status(404).json({ error: "Episódio não encontrado." });
    }

    res.status(200).json(episodio);
  } catch (error: any) {
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
});

// ROTA PARA ATUALIZAR UM EPISÓDIO EXISTENTE PELO ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        titulo,
        numero,
        descricao,
      } = req.body;
  
      if (!titulo && !numero && !descricao) {
         res.status(400).json({ error: "Nenhum campo para atualização foi fornecido." });
      }
  
      const updatedEpisodio = await db("episodios")
        .where({ id })
        .update({
          titulo,
          numero,
          descricao,
        })
        .returning("*");
  
      if (updatedEpisodio.length === 0) {
         res.status(404).json({ error: "Episódio não encontrado." });
      }
  
      res.status(200).json(updatedEpisodio[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.sqlMessage || error.message });
    }
  });
  
export default router;