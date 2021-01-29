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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarContasPorAnoEMes = exports.deletarConta = exports.alterarConta = exports.pagarConta = exports.adicionarConta = exports.showConta = exports.allContas = void 0;
const Conta_1 = __importStar(require("../models/Conta"));
const allContas = (req, res) => {
    const contas = Conta_1.default.find((err, contas) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(contas);
        }
    });
};
exports.allContas = allContas;
const showConta = (req, res) => {
    const conta = Conta_1.default.findById(req.params.id, (err, conta) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(conta);
        }
    });
};
exports.showConta = showConta;
const adicionarConta = (req, res) => {
    const conta = new Conta_1.default(req.body);
    conta.status = Conta_1.StatusDaConta.Pendente;
    console.log(conta);
    conta.save((err) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.send(conta);
        }
    });
};
exports.adicionarConta = adicionarConta;
const pagarConta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conta = yield Conta_1.default.findById(req.params.id);
    if (conta) {
        conta.status = Conta_1.StatusDaConta.Paga;
        conta.save();
        res.send(conta);
    }
    else {
        res.status(400).send('Erro ao pagar conta');
    }
});
exports.pagarConta = pagarConta;
const alterarConta = (req, res) => {
    let conta = Conta_1.default.findByIdAndUpdate(req.params.id, req.body, (err, conta) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(conta);
        }
    });
};
exports.alterarConta = alterarConta;
const deletarConta = (req, res) => {
    const conta = Conta_1.default.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ status: 'success' });
        }
    });
};
exports.deletarConta = deletarConta;
const buscarContasPorAnoEMes = (req, res) => {
    Conta_1.default
        .where('dataReferencia.mes').equals(req.params.mesReferencia)
        .where('dataReferencia.ano').equals(req.params.anoReferencia)
        .exec((erro, resultado) => {
        if (erro)
            res.status(400).send(erro);
        else
            res.send(resultado);
    });
};
exports.buscarContasPorAnoEMes = buscarContasPorAnoEMes;
//# sourceMappingURL=ContaController%20copy.js.map