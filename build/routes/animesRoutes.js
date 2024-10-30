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
const uuid_1 = require("uuid");
const knexfile_1 = __importDefault(require("../db/knexfile"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const anime = yield (0, knexfile_1.default)("animes").select("*");
        if (anime.length === 0) {
            res.status(404);
            throw new Error("Nenhum anime foi encontrado.");
        }
        res.status(200).json(anime);
    }
    catch (error) {
        const message = error.sqlMessage || error.message;
        res.json(message);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo, sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url, } = req.body;
        if (!titulo || !sinopse ||
            !genero || !numero_episodios ||
            !status || !ano_lancamento || !imagem_url) {
            res.status(400);
            throw new Error("Dados do anime incompletos");
        }
        const id = (0, uuid_1.v7)();
        const newAnime = yield (0, knexfile_1.default)("animes")
            .insert({
            id, titulo, sinopse,
            genero, numero_episodios, status,
            ano_lancamento, imagem_url
        })
            .returning("*");
        res.status(201).json(newAnime);
    }
    catch (error) {
        const message = error.sqlMessage || error.message;
        res.json(message);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const anime = yield (0, knexfile_1.default)("animes").where({ id }).first();
        if (!anime) {
            res.status(404);
            throw new Error("Anime não encontrado.");
        }
        res.status(200).json(anime);
    }
    catch (error) {
        const message = error.sqlMessage || error.message;
        res.json(message);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Rota /anime/${id} acessada - Método DELETE`);
    try {
        const deletedAnime = yield (0, knexfile_1.default)("animes").where({ id }).del();
        if (deletedAnime) {
            res.status(200).json({ success: "Anime deletado com sucesso." });
        }
        else {
            res.status(404).json({ error: "Anime não encontrado" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover anime" });
    }
}));
exports.default = router;
//# sourceMappingURL=animesRoutes.js.map