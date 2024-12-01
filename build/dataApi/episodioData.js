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
exports.deleteEpisodioFromDb = exports.fetchEpisodiosByAnimeId = exports.updateEpisodioInDb = exports.insertEpisodioInDb = exports.fetchEpisodioById = exports.fetchAnimeById = void 0;
const knexfile_1 = __importDefault(require("../db/knexfile"));
const fetchAnimeById = (animeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("animes").where({ id: animeId }).first();
});
exports.fetchAnimeById = fetchAnimeById;
const fetchEpisodioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("episodios").where({ id }).first();
});
exports.fetchEpisodioById = fetchEpisodioById;
const insertEpisodioInDb = (episodioData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("episodios").insert(episodioData).returning("*");
});
exports.insertEpisodioInDb = insertEpisodioInDb;
const updateEpisodioInDb = (id, episodioData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("episodios").where({ id }).update(episodioData).returning("*");
});
exports.updateEpisodioInDb = updateEpisodioInDb;
const fetchEpisodiosByAnimeId = (animeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("episodios").where({ anime_id: animeId });
});
exports.fetchEpisodiosByAnimeId = fetchEpisodiosByAnimeId;
const deleteEpisodioFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("episodios").where({ id }).del();
});
exports.deleteEpisodioFromDb = deleteEpisodioFromDb;
//# sourceMappingURL=episodioData.js.map