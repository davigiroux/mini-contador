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
const autorizacao_middleware_1 = __importDefault(require("../middleware/autorizacao.middleware"));
const Conta_1 = __importStar(require("../models/Conta"));
class ContaController {
    constructor() {
        this.path = '/contas';
        this.router = express_1.default.Router();
        this.buscarContasDoUsuario = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            Conta_1.default.find((err, contas) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(contas);
                }
            });
        });
        this.buscarConta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Conta_1.default.findById(req.params.id, (err, conta) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(conta);
                }
            });
        });
        this.adicionarConta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const conta = new Conta_1.default(req.body);
            conta.status = Conta_1.StatusDaConta.Pendente;
            conta.save((err) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.send(conta);
                }
            });
        });
        this.alterarConta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Conta_1.default.findByIdAndUpdate(req.params.id, req.body, (err, conta) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(conta);
                }
            });
        });
        this.deletarConta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Conta_1.default.deleteOne({ _id: req.params.id }, (err) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ status: 'success' });
                }
            });
        });
        this.buscarContasDoUsuarioPorAnoEMes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Conta_1.default
                .where('dataReferencia.mes').equals(req.params.mesReferencia)
                .where('dataReferencia.ano').equals(req.params.anoReferencia)
                .exec((erro, resultado) => {
                if (erro)
                    res.status(400).send(erro);
                else
                    res.send(resultado);
            });
        });
        this.pagarConta = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const conta = yield Conta_1.default.findById(req.params.id);
            if (conta) {
                conta.status = Conta_1.StatusDaConta.Paga;
                conta.save();
                res.send(conta);
            }
            else {
                res.status(400).send('Erro ao pagar conta');
            }
        });
        this.inicializarRotas();
    }
    inicializarRotas() {
        this.router.get(this.path, autorizacao_middleware_1.default, this.buscarContasDoUsuario);
        this.router.get(`${this.path}/mesReferencia/:mesReferencia/anoReferencia/:anoReferencia`, autorizacao_middleware_1.default, this.buscarContasDoUsuarioPorAnoEMes);
        this.router.get(`${this.path}/:id`, autorizacao_middleware_1.default, this.buscarConta);
        this.router.post(`${this.path}`, autorizacao_middleware_1.default, this.adicionarConta);
        this.router.put(`${this.path}/:id`, autorizacao_middleware_1.default, this.alterarConta);
        this.router.post(`${this.path}/:id/pagar`, autorizacao_middleware_1.default, this.pagarConta);
        this.router.delete(`${this.path}/:id`, autorizacao_middleware_1.default, this.deletarConta);
    }
}
exports.default = ContaController;
//# sourceMappingURL=ContaController.js.map