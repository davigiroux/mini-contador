import mongoose, { Schema, Document } from "mongoose";
import { ContaInterface } from "./Conta";


export interface UsuarioInterface extends Document {
  nome: string;
  email: string;
  senha: string;
  contas?: Array<ContaInterface>;
}

const UsuarioSchema: Schema = new Schema({
  nome: { type: String, required: true },
  senha: { type: String, required: true},
  email: {type: String, required: true},
  contas: {type: Schema.Types.ObjectId, ref: "Conta"}
}, { timestamps: true });

const Usuario = mongoose.model<UsuarioInterface>("Usuario", UsuarioSchema);
export default Usuario;