"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class TokenDeAutenticacaoFaltando extends HttpException_1.default {
    constructor() {
        super(401, "Não existe um token de autenticação do usuário");
    }
}
exports.default = TokenDeAutenticacaoFaltando;
//# sourceMappingURL=TokenDeAutenticacaoFaltando.js.map