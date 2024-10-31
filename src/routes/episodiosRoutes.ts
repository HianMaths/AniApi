import express, { Request, Response } from "express";
import { v7 as uuidv7 } from "uuid";
import db from "../db/knexfile";

const router = express.Router();

router.post("/:animeId", async (req: Request, res: Response) => {
  const { animeId } = req.params;
  const { titulo, descricao, numero } = req.body;

  try {
    const animeExists = await db("animes").where({ id: animeId }).first();

    if (!animeExists) {
      res.status(404).json({ message: "Anime não encontrado." });
    }

    const id = uuidv7();
    const novoEpisodio = await db("episodios")
      .insert({
        id,
        anime_id: animeId,
        titulo,
        descricao,
        numero,
      })
      .returning("*");

    res.status(201).json({
      message: "Episódio adicionado com sucesso.",
      episodio: novoEpisodio[0],
    });
  } catch (error: any) {
    console.error("Erro ao adicionar episódio:", error);
    res
      .status(500)
      .json({ message: error.message || "Erro interno do servidor." });
  }
});

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

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, numero, descricao } = req.body;

    if (!titulo && !numero && !descricao) {
      res
        .status(400)
        .json({ error: "Nenhum campo para atualização foi fornecido." });
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

// Método para buscar episódios
router.get("/episodio/:episodioId", async (req: Request, res: Response) => {
  try {
    const { episodioId } = req.params;

    const episodioExists = await db("episodios")
      .where({ id: episodioId })
      .first();
    if (!episodioExists) {
      res.status(404).json({ message: "Episódio não encontrado." });
    }

    const episodios = await db("episodios").where({ episodio_id: episodioId });

    res.status(200).json(episodios);
  } catch (error: any) {
    console.error("Erro ao buscar episódios:", error);
    res
      .status(500)
      .json({ message: error.message || "Erro interno do servidor." });
  }
});

export default router;
