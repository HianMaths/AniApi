import express from "express";
import {
  criarEpisodio,
  buscarEpisodioPorId,
  atualizarEpisodio,
  buscarEpisodiosPorAnimeId,
  deletarEpisodio,
} from "../controllers/episodioController";

const router = express.Router();

router.post("/:animeId", criarEpisodio);
router.get("/:id", buscarEpisodioPorId);
router.put("/:id", atualizarEpisodio);
router.get("/anime/:animeId", buscarEpisodiosPorAnimeId);
router.delete("/:id", deletarEpisodio);

export default router;
