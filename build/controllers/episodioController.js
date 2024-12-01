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
exports.deletarEpisodio = exports.buscarEpisodiosPorAnimeId = exports.atualizarEpisodio = exports.buscarEpisodioPorId = exports.criarEpisodio = void 0;
const episodioService_1 = require("../services/episodioService");
const criarEpisodio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { animeId } = req.params;
    const { titulo, descricao, numero } = req.body;
    try {
        const novoEpisodio = yield (0, episodioService_1.criarEpisodioService)(animeId, { titulo, descricao, numero });
        res.status(201).json({
            message: "Episódio adicionado com sucesso.",
            episodio: novoEpisodio,
        });
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.criarEpisodio = criarEpisodio;
const buscarEpisodioPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const episodio = yield (0, episodioService_1.buscarEpisodioPorIdService)(id);
        res.status(200).json(episodio);
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.buscarEpisodioPorId = buscarEpisodioPorId;
const atualizarEpisodio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, numero, descricao } = req.body;
    try {
        const updatedEpisodio = yield (0, episodioService_1.atualizarEpisodioService)(id, { titulo, numero, descricao });
        res.status(200).json(updatedEpisodio);
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || "Erro interno no servidor.";
        res.status(status).json({ message });
    }
});
exports.atualizarEpisodio = atualizarEpisodio;
const buscarEpisodiosPorAnimeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { animeId } = req.params;
    try {
        const episodios = yield (0, episodioService_1.buscarEpisodiosPorAnimeIdService)(animeId);
        res.status(200).json(episodios);
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.buscarEpisodiosPorAnimeId = buscarEpisodiosPorAnimeId;
const deletarEpisodio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, episodioService_1.deletarEpisodioService)(id);
        res.status(200).json({ message: "Episódio deletado com sucesso." });
    }
    catch (error) {
        res.status(error.status || 500).json(error.message);
    }
});
exports.deletarEpisodio = deletarEpisodio;
//# sourceMappingURL=episodioController.js.map