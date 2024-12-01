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
exports.buscarPersonagens = exports.deletePersonagemFromDb = exports.updatePersonagemInDb = exports.insertPersonagemInDb = exports.fetchPersonagensByAnimeId = exports.fetchPersonagemById = void 0;
const knexfile_1 = __importDefault(require("../db/knexfile"));
const fetchPersonagemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("personagens").where({ id }).first();
});
exports.fetchPersonagemById = fetchPersonagemById;
const fetchPersonagensByAnimeId = (animeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("personagens").where({ anime_id: animeId });
});
exports.fetchPersonagensByAnimeId = fetchPersonagensByAnimeId;
const insertPersonagemInDb = (personagemData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("personagens").insert(personagemData).returning("*");
});
exports.insertPersonagemInDb = insertPersonagemInDb;
const updatePersonagemInDb = (id, personagemData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("personagens").where({ id }).update(personagemData).returning("*");
});
exports.updatePersonagemInDb = updatePersonagemInDb;
const deletePersonagemFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knexfile_1.default)("personagens").where({ id }).del();
});
exports.deletePersonagemFromDb = deletePersonagemFromDb;
const buscarPersonagens = (nome, descricao) => __awaiter(void 0, void 0, void 0, function* () {
    let query = (0, knexfile_1.default)("personagens").select("*");
    if (nome) {
        query = query.where("nome", "ilike", `%${nome}%`);
    }
    if (descricao) {
        query = query.where("descricao", "ilike", `%${descricao}%`);
    }
    return yield query;
});
exports.buscarPersonagens = buscarPersonagens;
//# sourceMappingURL=personagensData.js.map