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
exports.deletarEpisodioService = exports.buscarEpisodiosPorAnimeIdService = exports.atualizarEpisodioService = exports.buscarEpisodioPorIdService = exports.criarEpisodioService = void 0;
const uuid_1 = require("uuid");
const episodioData_1 = require("../dataApi/episodioData");
const criarEpisodioService = (animeId, episodioData) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descricao, numero } = episodioData;
    if (!titulo || !descricao || !numero) {
        const error = new Error("Dados faltantes");
        error.status = 400;
        throw error;
    }
    const animeExists = yield (0, episodioData_1.fetchAnimeById)(animeId);
    if (!animeExists) {
        const error = new Error("Anime não encontrado.");
        error.status = 404;
        throw error;
    }
    const id = (0, uuid_1.v7)();
    return yield (0, episodioData_1.insertEpisodioInDb)({ id, anime_id: animeId, titulo, descricao, numero });
});
exports.criarEpisodioService = criarEpisodioService;
const buscarEpisodioPorIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const episodio = yield (0, episodioData_1.fetchEpisodioById)(id);
    if (!episodio) {
        const error = new Error("Episódio não encontrado.");
        error.status = 404;
        throw error;
    }
    return episodio;
});
exports.buscarEpisodioPorIdService = buscarEpisodioPorIdService;
const atualizarEpisodioService = (id, episodioData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!episodioData.titulo && !episodioData.numero && !episodioData.descricao) {
        const error = new Error("Nenhum campo para atualização foi fornecido.");
        error.status = 400;
        throw error;
    }
    const updatedEpisodio = yield (0, episodioData_1.updateEpisodioInDb)(id, episodioData);
    if (!updatedEpisodio) {
        const error = new Error("Episódio não encontrado.");
        error.status = 404;
        throw error;
    }
    return updatedEpisodio;
});
exports.atualizarEpisodioService = atualizarEpisodioService;
const buscarEpisodiosPorAnimeIdService = (animeId) => __awaiter(void 0, void 0, void 0, function* () {
    const animeExists = yield (0, episodioData_1.fetchAnimeById)(animeId);
    if (!animeExists) {
        const error = new Error("Anime não encontrado.");
        error.status = 404;
        throw error;
    }
    return yield (0, episodioData_1.fetchEpisodiosByAnimeId)(animeId);
});
exports.buscarEpisodiosPorAnimeIdService = buscarEpisodiosPorAnimeIdService;
const deletarEpisodioService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const episodio = yield (0, episodioData_1.fetchEpisodioById)(id);
    if (!episodio) {
        const error = new Error("Episódio não encontrado.");
        error.status = 404;
        throw error;
    }
    return yield (0, episodioData_1.deleteEpisodioFromDb)(id);
});
exports.deletarEpisodioService = deletarEpisodioService;
//# sourceMappingURL=episodioService.js.map