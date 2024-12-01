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
exports.buscarPersonagens = exports.deletarPersonagem = exports.atualizarPersonagem = exports.criarPersonagem = exports.buscarPersonagensPorAnimeId = exports.buscarPersonagemPorId = void 0;
const personagemService_1 = require("../services/personagemService");
const buscarPersonagemPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const personagem = yield (0, personagemService_1.buscarPersonagemPorIdService)(id);
        res.status(200).json(personagem);
    }
    catch (error) {
        res.status(error.status || 404).json(error.message);
    }
});
exports.buscarPersonagemPorId = buscarPersonagemPorId;
const buscarPersonagensPorAnimeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { animeId } = req.params;
        const personagens = yield (0, personagemService_1.buscarPersonagensPorAnimeIdService)(animeId);
        res.status(200).json(personagens);
    }
    catch (error) {
        res.status(error.status || 404).json(error.message);
    }
});
exports.buscarPersonagensPorAnimeId = buscarPersonagensPorAnimeId;
const criarPersonagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { animeId } = req.params;
        const personagemData = req.body;
        const newPersonagem = yield (0, personagemService_1.criarPersonagemService)(animeId, personagemData);
        res.status(201).json(newPersonagem);
    }
    catch (error) {
        res.status(error.status || 404).json(error.message);
    }
});
exports.criarPersonagem = criarPersonagem;
const atualizarPersonagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const personagemData = req.body;
        const updatedPersonagem = yield (0, personagemService_1.atualizarPersonagemService)(id, personagemData);
        res.status(200).json(updatedPersonagem);
    }
    catch (error) {
        res.status(error.status || 404).json(error.message);
    }
});
exports.atualizarPersonagem = atualizarPersonagem;
const deletarPersonagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, personagemService_1.deletarPersonagemService)(id);
        res.status(200).json("Personagem deletado com sucesso.");
    }
    catch (error) {
        res.status(error.status || 404).json(error.message);
    }
});
exports.deletarPersonagem = deletarPersonagem;
const buscarPersonagens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, descricao } = req.query;
        const filtros = {
            nome: nome,
            descricao: descricao,
        };
        const personagens = yield (0, personagemService_1.buscarPersonagensService)(filtros);
        res.status(200).json(personagens);
    }
    catch (error) {
        console.error("Erro ao buscar personagens:", error);
        if (error.status === 404) {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Erro interno ao buscar personagens." });
        }
    }
});
exports.buscarPersonagens = buscarPersonagens;
//# sourceMappingURL=personagemController.js.map