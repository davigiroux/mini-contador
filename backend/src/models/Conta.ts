import mongoose, { Schema, Document } from "mongoose";
interface ReferenciaInterface extends Document {
  mes: number;
  ano: number;
}

export enum StatusDaConta {
  Pendente = 0,
  Paga = 1,
  Cancelada = 2
}

export interface ContaInterface extends Document {
  descricao: string;
  valor: number;
  dataReferencia: ReferenciaInterface;
  status: StatusDaConta;
}

const ContaSchema: Schema = new Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  dataReferencia: {
    ano: { type: Number, required: true },
    mes: { type: Number, required: true}
  },
  status: {type: Number, required: true}
});

const Conta = mongoose.model<ContaInterface>("Conta", ContaSchema);
export default Conta;