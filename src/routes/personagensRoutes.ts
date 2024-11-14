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

export default router;
