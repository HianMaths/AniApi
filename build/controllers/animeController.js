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
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarAnime = exports.deleteAnime = exports.getAnimeById = exports.createAnime = exports.buscarAnimes = exports.getAllAnimes = void 0;
const animeServie_1 = require("../services/animeServie");
const getAllAnimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animes = yield (0, animeServie_1.getAllAnimesService)();
        res.status(200).json(animes);
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.getAllAnimes = getAllAnimes;
const buscarAnimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genero, titulo, ano } = req.query;
        const filtros = {
            genero: genero,
            titulo: titulo,
            ano: ano,
        };
        const animes = yield (0, animeServie_1.buscarAnimesService)(filtros);
        res.status(200).json(animes);
    }
    catch (error) {
        if (error.message === "O parâmetro 'ano' deve ser um número válido.") {
            res.status(400).json(error.message);
        }
        if (error.message === "Nenhum anime foi encontrado.") {
            res.status(404).json(error.message);
        }
        res.status(500).json("Erro interno ao buscar animes.");
    }
});
exports.buscarAnimes = buscarAnimes;
const createAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeData = req.body;
        const newAnime = yield (0, animeServie_1.createAnimeService)(animeData);
        res.status(201).json(newAnime);
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.createAnime = createAnime;
const getAnimeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const anime = yield (0, animeServie_1.getAnimeByIdService)(id);
        res.status(200).json(anime);
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.getAnimeById = getAnimeById;
const deleteAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, animeServie_1.deleteAnimeService)(id);
        res.status(200).json("Anime deletado com sucesso.");
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.deleteAnime = deleteAnime;
const atualizarAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url } = req.body;
    try {
        const updatedAnime = yield (0, animeServie_1.atualizarAnimeService)(id, {
            titulo,
            sinopse,
            genero,
            numero_episodios,
            status,
            ano_lancamento,
            imagem_url,
        });
        res.status(200).json(updatedAnime);
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || "Erro interno no servidor.";
        res.status(status).json({ message });
    }
});
exports.atualizarAnime = atualizarAnime;
//# sourceMappingURL=animeController.js.map