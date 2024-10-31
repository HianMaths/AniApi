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

export default router;