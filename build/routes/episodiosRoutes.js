"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const episodioController_1 = require("../controllers/episodioController");
const router = express_1.default.Router();
router.post("/:animeId", episodioController_1.criarEpisodio);
router.get("/:id", episodioController_1.buscarEpisodioPorId);
router.put("/:id", episodioController_1.atualizarEpisodio);
router.get("/anime/:animeId", episodioController_1.buscarEpisodiosPorAnimeId);
router.delete("/:id", episodioController_1.deletarEpisodio);
exports.default = router;
//# sourceMappingURL=episodiosRoutes.js.map