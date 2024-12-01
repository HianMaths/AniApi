"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personagemController_1 = require("../controllers/personagemController");
const router = express_1.default.Router();
router.get("/search", personagemController_1.buscarPersonagens);
router.get("/:id", personagemController_1.buscarPersonagemPorId);
router.get("/:animeId/personagens", personagemController_1.buscarPersonagensPorAnimeId);
router.post("/:animeId", personagemController_1.criarPersonagem);
router.put("/:id/personagens", personagemController_1.atualizarPersonagem);
router.delete("/:id", personagemController_1.deletarPersonagem);
exports.default = router;
//# sourceMappingURL=personagensRoutes.js.map