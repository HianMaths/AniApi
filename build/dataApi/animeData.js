"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarAnimePorId = buscarAnimePorId;
const knexfile_1 = __importDefault(require("../db/knexfile"));
function buscarAnimePorId(animeId) {
    return (0, knexfile_1.default)("animes").where({ id: animeId }).first();
}
;
//# sourceMappingURL=animeData.js.map