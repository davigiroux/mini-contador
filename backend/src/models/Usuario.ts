import mongoose, { Schema, Document } from "mongoose";


export interface UsuarioInterface extends Document {
  nome: string;
  email: string;
  senha: string;
}

const UsuarioSchema: Schema = new Schema({
  nome: { type: String, required: true },
  senha: { type: String, required: true},
  email: {type: String, required: true}
}, { timestamps: true });

const Usuario = mongoose.model<UsuarioInterface>("Usuario", UsuarioSchema);
export default Usuario;