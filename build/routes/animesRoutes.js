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
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Rota /anime acessada - Método GET");
    try {
        const anime = yield (0, knexfile_1.default)("animes").select("*");
        res.status(200).json(anime);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar animes" });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url } = req.body;
    console.log("Rota /anime acessada - Método POST");
    if (!titulo || !sinopse || !genero || !numero_episodios || !status || !ano_lancamento || !imagem_url) {
        res.status(400).json({ error: "Dados do anime incompletos" });
    }
    try {
        const newAnime = yield (0, knexfile_1.default)("animes").insert({ titulo, sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url }).returning("*");
        res.status(201).json(newAnime);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao adicionar anime" });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Rota /anime/${id} acessada - Método GET`);
    try {
        const anime = yield (0, knexfile_1.default)("animes").where({ id }).first();
        if (anime) {
            res.status(200).json(anime);
        }
        else {
            res.status(404).json({ error: "Anime não encontrado." });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar anime." });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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