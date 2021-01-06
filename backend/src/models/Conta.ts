import mongoose, { Schema, Document } from "mongoose";

enum TipoDeConta {
  Debito = "0",
  Credito = "1"
}

export interface ContaInterface extends Document {
  descricao: string;
  valor: number;
  tipo: TipoDeConta;
  mesReferencia: Number;
}

const ContaSchema: Schema = new Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  tipo: { type: Number, required: true},
  mesReferencia: { type: Number, required: true }
});

const Conta = mongoose.model<ContaInterface>("Conta", ContaSchema);
export default Conta;