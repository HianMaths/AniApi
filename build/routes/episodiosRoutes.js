"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knexfile_1 = __importDefault(require("../db/knexfile"));
const router = express_1.default.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const episodio = yield (0, knexfile_1.default)("episodios").where({ id }).first();
        if (!episodio) {
            res.status(404).json({ error: "Episódio não encontrado." });
        }
        res.status(200).json(episodio);
    }
    catch (error) {
        res.status(500).json({ error: error.sqlMessage || error.message });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { titulo, numero, descricao, } = req.body;
        if (!titulo && !numero && !descricao) {
            res.status(400).json({ error: "Nenhum campo para atualização foi fornecido." });
        }
        const updatedEpisodio = yield (0, knexfile_1.default)("episodios")
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
    }
    catch (error) {
        res.status(500).json({ error: error.sqlMessage || error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=episodiosRoutes.js.map