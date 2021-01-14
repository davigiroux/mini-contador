"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_1 = __importDefault(require("./connect"));
const ContaController = __importStar(require("./controllers/ContaController"));
const app = express_1.default();
const port = 5000 || process.env.PORT;
const db = "mongodb+srv://dev:RPf1mXtfyOcroyYA@cluster0.p7xx5.mongodb.net/MiniContador?retryWrites=true&w=majority";
connect_1.default(db);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.get("/contas", ContaController.allContas);
app.get("/contas/mesReferencia/:mesReferencia/anoReferencia/:anoReferencia", ContaController.buscarContasPorAnoEMes);
app.get("/contas/:id", ContaController.showConta);
app.post("/contas", ContaController.adicionarConta);
app.put("/contas/:id", ContaController.alterarConta);
app.delete("/contas/:id", ContaController.deletarConta);
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
//# sourceMappingURL=App.js.map