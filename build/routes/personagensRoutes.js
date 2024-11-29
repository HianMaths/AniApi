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
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const personagem = yield (0, knexfile_1.default)("personagens").where({ id }).first();
        if (!personagem) {
            res.status(404);
            throw new Error("Personagem não encontrado.");
        }
        res.status(200).json(personagem);
    }
    catch (error) {
        const message = error.sqlMessage || error.message;
        res.json(message);
    }
}));
router.get("/:animeId/personagens", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { animeId } = req.params;
        const personagens = yield (0, knexfile_1.default)("personagens").where({ anime_id: animeId });
        if (personagens.length === 0) {
            res.status(404);
            throw new Error("Nenhum personagem encontrado para este anime.");
        }
        res.status(200).json(personagens);
    }
    catch (error) {
        const message = error.sqlMessage || error.message;
        res.json(message);
    }
}));
const uuid_1 = require("uuid");
router.post("/:animeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { animeId } = req.params;
        const { nome, descricao, imagem_url } = req.body;
        if (!nome || !descricao || !imagem_url) {
            res.status(404);
            throw new Error("Os dados do personagem estão incompletos");
        }
        const id = (0, uuid_1.v7)();
        const newPersonagem = yield (0, knexfile_1.default)("personagens")
            .insert({
            id,
            nome,
            descricao,
            imagem_url,
            anime_id: animeId,
        })
            .returning("*");
        res.status(201).json(newPersonagem);
    }
    catch (error) {
        const message = error.sqlMessage || error.message;
        res.json(message);
    }
}));
router.put("/:id/personagens", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nome, descricao, imagem_url } = req.body;
        if (!nome && !descricao && !imagem_url) {
            res
                .status(400)
                .json({ error: "Nenhum campo para atualização foi fornecido." });
        }
        const updatedPersonagem = yield (0, knexfile_1.default)("personagens")
            .where({ id })
            .update({
            nome,
            descricao,
            imagem_url,
        })
            .returning("*");
        if (updatedPersonagem.length === 0) {
            res.status(404).json({ error: "Personagem não encontrado." });
        }
        res.status(200).json(updatedPersonagem[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.sqlMessage || error.message });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPersonagem = yield (0, knexfile_1.default)("personagens").where({ id }).del();
        if (!deletedPersonagem) {
            res.status(404);
            throw new Error("Personagem não encontrado.");
        }
        res.status(200).json("Personagem deletado com sucesso.");
    }
    catch (error) {
        const message = error.sqlMessage || error.message;
        res.json(message);
    }
}));
exports.default = router;
//# sourceMappingURL=personagensRoutes.js.map