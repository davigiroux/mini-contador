import mongoose, { Schema, Document } from "mongoose";
import { ReferenciaInterface } from './Referencia';


export interface ContaInterface extends Document {
  descricao: string;
  valor: number;
  dataReferencia: ReferenciaInterface;
}

const ContaSchema: Schema = new Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  dataReferencia: {
    ano: { type: Number, required: true },
    mes: { type: Number, required: true}
  }
});

const Conta = mongoose.model<ContaInterface>("Conta", ContaSchema);
export default Conta;