"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class UsuarioComEsseEmailJaExisteException extends HttpException_1.default {
    constructor(email) {
        super(400, `Usuário com email ${email} já cadastrado`);
    }
}
exports.default = UsuarioComEsseEmailJaExisteException;
//# sourceMappingURL=UsuarioComEsseEmailJaExisteException.js.map