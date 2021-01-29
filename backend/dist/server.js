"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const AutenticacaoController_1 = __importDefault(require("./controllers/AutenticacaoController"));
const ContaController_1 = __importDefault(require("./controllers/ContaController"));
const porta = Number(process.env.PORT) || 3000;
const app = new App_1.default([
    new AutenticacaoController_1.default(),
    new ContaController_1.default()
], porta);
app.listen();
//# sourceMappingURL=server.js.map