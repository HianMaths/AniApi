"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const animeController_1 = require("../controllers/animeController");
const router = express_1.default.Router();
router.get("/", animeController_1.getAllAnimes);
router.get("/search", animeController_1.buscarAnimes);
router.post("/", animeController_1.createAnime);
router.put("/:id", animeController_1.atualizarAnime);
router.get("/:id", animeController_1.getAnimeById);
router.delete("/:id", animeController_1.deleteAnime);
exports.default = router;
//# sourceMappingURL=animesRoutes.js.map