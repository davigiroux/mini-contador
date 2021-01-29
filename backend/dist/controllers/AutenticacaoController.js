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
const bcrypt = __importStar(require("bcrypt"));
const express = __importStar(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsuarioComEsseEmailJaExisteException_1 = __importDefault(require("../exceptions/UsuarioComEsseEmailJaExisteException"));
const CredenciaisErradasException_1 = __importDefault(require("../exceptions/CredenciaisErradasException"));
const validacao_middlware_1 = __importDefault(require("../middleware/validacao.middlware"));
const usuario_dto_1 = __importDefault(require("./dto/usuario.dto"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const login_dto_1 = __importDefault(require("./dto/login.dto"));
class AutenticacaoController {
    constructor() {
        this.path = '/autenticacao';
        this.router = express.Router();
        this.usuario = Usuario_1.default;
        this.registrar = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            const usuarioComEmail = yield this.usuario.findOne({ email: userData.email });
            if (usuarioComEmail) {
                next(new UsuarioComEsseEmailJaExisteException_1.default(userData.email));
            }
            else {
                const hashedPassword = yield bcrypt.hash(userData.senha, 10);
                const user = yield this.usuario.create(Object.assign(Object.assign({}, userData), { senha: hashedPassword }));
                user.senha = '';
                response.send(user._id);
            }
        });
        this.logar = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const dadosDeLogin = request.body;
            const usuario = yield this.usuario.findOne({ email: dadosDeLogin.email });
            if (usuario) {
                const isPasswordMatching = yield bcrypt.compare(dadosDeLogin.senha, usuario.senha);
                if (isPasswordMatching) {
                    usuario.senha = '';
                    const tokenData = this.createToken(usuario);
                    response.send(Object.assign(Object.assign({}, tokenData), { nome: usuario.nome, _id: usuario._id }));
                }
                else {
                    next(new CredenciaisErradasException_1.default());
                }
            }
            else {
                next(new CredenciaisErradasException_1.default());
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/registrar`, validacao_middlware_1.default(usuario_dto_1.default), this.registrar);
        this.router.post(`${this.path}/login`, validacao_middlware_1.default(login_dto_1.default), this.logar);
    }
    createToken(usuario) {
        const expiresIn = 60 * 60;
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken = {
            _id: usuario._id,
        };
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret || 'segredo', { expiresIn }),
        };
    }
}
exports.default = AutenticacaoController;
//# sourceMappingURL=AutenticacaoController.js.map