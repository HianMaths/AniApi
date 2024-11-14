import express, { Request, Response } from "express";
import { v7 as uuidv7 } from "uuid";
import db from "../db/knexfile";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const { genero, titulo, ano } = req.query;

    let query = db("animes").select("*");

    if (genero) {
      query = query.whereRaw("? = ANY(genero)", [genero as string]);
    }
    if (titulo) {
      query = query.where("titulo", "ilike", `%${titulo}%`);
    }
    if (ano) {
      query = query.where("ano_lancamento", Number(ano));
    }

    const animes = await query;

    if (animes.length === 0) {
      res.status(404);
      throw new Error("Nenhum anime foi encontrado.");
    }
    res.status(200).json(animes);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

router.get("/", async (req, res) => {
  try {
    const anime = await db("animes").select("*");
    if (anime.length === 0) {
      res.status(404);
      throw new Error("Nenhum anime foi encontrado.");
    }
    res.status(200).json(anime);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      titulo,
      sinopse,
      genero,
      numero_episodios,
      status,
      ano_lancamento,
      imagem_url,
    } = req.body;

    if (
      !titulo ||
      !sinopse ||
      !genero ||
      !numero_episodios ||
      !status ||
      !ano_lancamento ||
      !imagem_url
    ) {
      res.status(400);
      throw new Error("Dados do anime incompletos");
    }
    const id = uuidv7();

    const newAnime = await db("animes")
      .insert({
        id,
        titulo,
        sinopse,
        genero,
        numero_episodios,
        status,
        ano_lancamento,
        imagem_url,
      })
      .returning("*");
    res.status(201).json(newAnime);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const anime = await db("animes").where({ id }).first();

    if (!anime) {
      res.status(404);
      throw new Error("Anime não encontrado.");
    }

    res.status(200).json(anime);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAnime = await db("animes").where({ id }).del();

    if (!deletedAnime) {
      res.status(404);
      throw new Error("Anime não encontrado");
    }

    res.status(200).json("Anime deletado com sucesso.");
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.json(message);
  }
});
export default router;
