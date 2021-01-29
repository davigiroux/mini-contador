"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarUsuario = exports.alterarUsuario = exports.adicionarUsuario = exports.buscarUsuario = exports.buscarTodosUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const buscarTodosUsuarios = (req, res) => {
    const usuarios = Usuario_1.default.find((err, usuarios) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(usuarios);
        }
    });
};
exports.buscarTodosUsuarios = buscarTodosUsuarios;
const buscarUsuario = (req, res) => {
    const usuario = Usuario_1.default.findById(req.params.id, (err, usuario) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(usuario);
        }
    });
};
exports.buscarUsuario = buscarUsuario;
const adicionarUsuario = (req, res) => {
    const usuario = new Usuario_1.default(req.body);
    usuario.save((err) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.send(usuario);
        }
    });
};
exports.adicionarUsuario = adicionarUsuario;
const alterarUsuario = (req, res) => {
    let usuario = Usuario_1.default.findByIdAndUpdate(req.params.id, req.body, (err, usuario) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(usuario);
        }
    });
};
exports.alterarUsuario = alterarUsuario;
const deletarUsuario = (req, res) => {
    const usuario = Usuario_1.default.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ status: 'success' });
        }
    });
};
exports.deletarUsuario = deletarUsuario;
//# sourceMappingURL=UsuarioController.js.map