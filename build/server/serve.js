"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const animesRoutes_1 = __importDefault(require("../routes/animesRoutes"));
const episodiosRoutes_1 = __importDefault(require("../routes/episodiosRoutes"));
const personagensRoutes_1 = __importDefault(require("../routes/personagensRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/anime', animesRoutes_1.default);
app.use('/episodios', episodiosRoutes_1.default);
app.use('/personagens', personagensRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
//# sourceMappingURL=serve.js.map