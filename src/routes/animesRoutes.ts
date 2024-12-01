import express from "express";
import {
  getAllAnimes,
  buscarAnimes,
  createAnime,
  getAnimeById,
  deleteAnime,
  atualizarAnime,
} from "../controllers/animeController";

const router = express.Router();

router.get("/", getAllAnimes);
router.get("/search", buscarAnimes);
router.post("/", createAnime);
router.put("/:id", atualizarAnime);
router.get("/:id", getAnimeById);
router.delete("/:id", deleteAnime);

export default router;