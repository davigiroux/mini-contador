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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusDaConta = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var StatusDaConta;
(function (StatusDaConta) {
    StatusDaConta[StatusDaConta["Pendente"] = 0] = "Pendente";
    StatusDaConta[StatusDaConta["Paga"] = 1] = "Paga";
    StatusDaConta[StatusDaConta["Cancelada"] = 2] = "Cancelada";
})(StatusDaConta = exports.StatusDaConta || (exports.StatusDaConta = {}));
const ContaSchema = new mongoose_1.Schema({
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    dataReferencia: {
        ano: { type: Number, required: true },
        mes: { type: Number, required: true }
    },
    status: { type: Number, required: true },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "Usuario" }
});
const Conta = mongoose_1.default.model("Conta", ContaSchema);
exports.default = Conta;
//# sourceMappingURL=Conta.js.map