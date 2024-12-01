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
exports.buscarPersonagensService = exports.deletarPersonagemService = exports.atualizarPersonagemService = exports.criarPersonagemService = exports.buscarPersonagensPorAnimeIdService = exports.buscarPersonagemPorIdService = void 0;
const uuid_1 = require("uuid");
const personagensData_1 = require("../dataApi/personagensData");
const buscarPersonagemPorIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const personagem = yield (0, personagensData_1.fetchPersonagemById)(id);
    if (!personagem) {
        const error = new Error("Personagem não encontrado.");
        error.status = 404;
        throw error;
    }
    return personagem;
});
exports.buscarPersonagemPorIdService = buscarPersonagemPorIdService;
const buscarPersonagensPorAnimeIdService = (animeId) => __awaiter(void 0, void 0, void 0, function* () {
    const personagens = yield (0, personagensData_1.fetchPersonagensByAnimeId)(animeId);
    if (personagens.length === 0) {
        const error = new Error("Nenhum personagem encontrado para este anime.");
        error.status = 404;
        throw error;
    }
    return personagens;
});
exports.buscarPersonagensPorAnimeIdService = buscarPersonagensPorAnimeIdService;
const criarPersonagemService = (animeId, personagemData) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, descricao, imagem_url } = personagemData;
    if (!nome || !descricao || !imagem_url) {
        const error = new Error("Os dados do personagem estão incompletos");
        error.status = 400;
        throw error;
    }
    const id = (0, uuid_1.v7)();
    return yield (0, personagensData_1.insertPersonagemInDb)(Object.assign(Object.assign({ id }, personagemData), { anime_id: animeId }));
});
exports.criarPersonagemService = criarPersonagemService;
const atualizarPersonagemService = (id, personagemData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!personagemData.nome || !personagemData.descricao || !personagemData.imagem_url) {
        const error = new Error("Todos os campos são obrigatórios para atualização.");
        error.status = 400;
        throw error;
    }
    const updatedPersonagem = yield (0, personagensData_1.updatePersonagemInDb)(id, personagemData);
    if (!updatedPersonagem) {
        const error = new Error("Personagem não encontrado.");
        error.status = 404;
        throw error;
    }
    return updatedPersonagem;
});
exports.atualizarPersonagemService = atualizarPersonagemService;
const deletarPersonagemService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedPersonagem = yield (0, personagensData_1.deletePersonagemFromDb)(id);
    if (!deletedPersonagem) {
        const error = new Error("Personagem não encontrado.");
        error.status = 404;
        throw error;
    }
});
exports.deletarPersonagemService = deletarPersonagemService;
const buscarPersonagensService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const personagens = yield (0, personagensData_1.buscarPersonagens)(params.nome, params.descricao);
    if (!personagens || personagens.length === 0) {
        const error = new Error("Nenhum Personagem foi encontrado.");
        error.status = 404;
        throw error;
    }
    return personagens;
});
exports.buscarPersonagensService = buscarPersonagensService;
//# sourceMappingURL=personagemService.js.map