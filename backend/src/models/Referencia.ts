import { Document } from "mongoose";


export interface ReferenciaInterface extends Document {
  mes: number;
  ano: number;
}

export default ReferenciaInterface;