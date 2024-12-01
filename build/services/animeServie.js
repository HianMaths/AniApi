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
exports.atualizarAnimeService = exports.deleteAnimeService = exports.getAnimeByIdService = exports.createAnimeService = exports.buscarAnimesService = exports.getAllAnimesService = void 0;
const uuid_1 = require("uuid");
const animeData_1 = require("../dataApi/animeData");
const getAllAnimesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const animes = yield (0, animeData_1.fetchAllAnimes)();
    if (animes.length === 0) {
        const error = new Error("Nenhum anime foi encontrado.");
        error.status = 404;
        throw error;
    }
    return animes;
});
exports.getAllAnimesService = getAllAnimesService;
const buscarAnimesService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const animes = yield (0, animeData_1.buscarAnimes)(params.genero, params.titulo, params.ano);
    if (!animes || animes.length === 0) {
        throw new Error("Nenhum anime foi encontrado.");
    }
    return animes;
});
exports.buscarAnimesService = buscarAnimesService;
const createAnimeService = (animeData) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, sinopse, genero, numero_episodios, status, ano_lancamento, imagem_url } = animeData;
    if (!titulo || !sinopse || !genero || !numero_episodios || !status || !ano_lancamento || !imagem_url) {
        const error = new Error("Dados do anime incompletos");
        error.status = 400;
        throw error;
    }
    const id = (0, uuid_1.v7)();
    return yield (0, animeData_1.insertAnimeInDb)(Object.assign({ id }, animeData));
});
exports.createAnimeService = createAnimeService;
const getAnimeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const anime = yield (0, animeData_1.fetchAnimeById)(id);
    if (!anime) {
        const error = new Error("Anime não encontrado.");
        error.status = 404;
        throw error;
    }
    return anime;
});
exports.getAnimeByIdService = getAnimeByIdService;
const deleteAnimeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedAnime = yield (0, animeData_1.deleteAnimeFromDb)(id);
    if (!deletedAnime) {
        const error = new Error("Anime não encontrado");
        error.status = 404;
        throw error;
    }
});
exports.deleteAnimeService = deleteAnimeService;
const atualizarAnimeService = (id, animeData) => __awaiter(void 0, void 0, void 0, function* () {
    const validStatus = ["em_exibicao", "finalizado", "cancelado"];
    if (!animeData.titulo &&
        !animeData.sinopse &&
        !animeData.genero &&
        !animeData.numero_episodios &&
        !animeData.status &&
        !animeData.ano_lancamento &&
        !animeData.imagem_url) {
        const error = new Error("Nenhum campo para atualização foi fornecido.");
        error.status = 400;
        throw error;
    }
    if (animeData.status && !validStatus.includes(animeData.status)) {
        const error = new Error(`Status inválido. Valores permitidos: ${validStatus.join(", ")}.`);
        error.status = 400;
        throw error;
    }
    const updatedAnime = yield (0, animeData_1.updateAnimeInDb)(id, animeData);
    if (!updatedAnime.length) {
        const error = new Error("Anime não encontrado.");
        error.status = 404;
        throw error;
    }
    return updatedAnime[0];
});
exports.atualizarAnimeService = atualizarAnimeService;
//# sourceMappingURL=animeServie.js.map