"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarContasPorAnoEMes = exports.deletarConta = exports.alterarConta = exports.adicionarConta = exports.showConta = exports.allContas = void 0;
const Conta_1 = __importDefault(require("../models/Conta"));
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
//# sourceMappingURL=ContaController.js.map