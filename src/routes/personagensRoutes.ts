import express from "express";
import {
  buscarPersonagemPorId,
  buscarPersonagensPorAnimeId,
  criarPersonagem,
  atualizarPersonagem,
  deletarPersonagem,
  buscarPersonagens,
} from "../controllers/personagensController";

const router = express.Router();

router.get("/search", buscarPersonagens);
router.get("/:id", buscarPersonagemPorId);
router.get("/:animeId/personagens", buscarPersonagensPorAnimeId);
router.post("/:animeId", criarPersonagem);
router.put("/:id/personagens", atualizarPersonagem);
router.delete("/:id", deletarPersonagem);

export default router;