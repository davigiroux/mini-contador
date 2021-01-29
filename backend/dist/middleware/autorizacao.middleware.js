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
const jwt = __importStar(require("jsonwebtoken"));
const TokenDeAutenticacaoFaltando_1 = __importDefault(require("../exceptions/TokenDeAutenticacaoFaltando"));
const TokenDeAutenticacaoInvalido_1 = __importDefault(require("../exceptions/TokenDeAutenticacaoInvalido"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
function autorizacaoMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = request;
        const headers = req.headers;
        if (headers && headers.authorization && headers.authorization !== "") {
            const secret = process.env.JWT_SECRET;
            try {
                const token = headers.authorization.split(" ")[1];
                const respostaDeVerificacao = jwt.verify(token, secret || 'segredo');
                const id = respostaDeVerificacao._id;
                const usuario = yield Usuario_1.default.findById(id);
                if (usuario) {
                    req.usuario = usuario;
                    next();
                }
                else {
                    next(new TokenDeAutenticacaoInvalido_1.default());
                }
            }
            catch (error) {
                next(new TokenDeAutenticacaoInvalido_1.default());
            }
        }
        else {
            next(new TokenDeAutenticacaoFaltando_1.default());
        }
    });
}
exports.default = autorizacaoMiddleware;
//# sourceMappingURL=autorizacao.middleware.js.map