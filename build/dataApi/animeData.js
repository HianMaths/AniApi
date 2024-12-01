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
exports.updateAnimeInDb = exports.deleteAnimeFromDb = exports.fetchAnimeById = exports.insertAnimeInDb = exports.buscarAnimes = exports.fetchAllAnimes = void 0;
const knexfile_1 = __importDefault(require("../db/knexfile"));
const fetchAllAnimes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("animes").select("*");
});
exports.fetchAllAnimes = fetchAllAnimes;
const buscarAnimes = (genero, titulo, ano) => __awaiter(void 0, void 0, void 0, function* () {
    let query = (0, knexfile_1.default)("animes").select("*");
    if (genero) {
        query = query.whereRaw("? = ANY(genero)", [genero]);
    }
    if (titulo) {
        query = query.where("titulo", "ilike", `%${titulo}%`);
    }
    if (ano) {
        const anoNumero = Number(ano);
        if (!isNaN(anoNumero)) {
            query = query.where("ano_lancamento", anoNumero);
        }
        else {
            throw new Error("O parâmetro 'ano' deve ser um número válido.");
        }
    }
    return yield query;
});
exports.buscarAnimes = buscarAnimes;
const insertAnimeInDb = (animeData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("animes").insert(animeData).returning("*");
});
exports.insertAnimeInDb = insertAnimeInDb;
const fetchAnimeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("animes").where({ id }).first();
});
exports.fetchAnimeById = fetchAnimeById;
const deleteAnimeFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("animes").where({ id }).del();
});
exports.deleteAnimeFromDb = deleteAnimeFromDb;
const updateAnimeInDb = (id, animeData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("animes").where({ id }).update(animeData).returning("*");
});
exports.updateAnimeInDb = updateAnimeInDb;
//# sourceMappingURL=animeData.js.map