import express from 'express';
import { UsuarioInterface } from '../../models/Usuario';
 
interface RequestComUsuario extends express.Request {
  usuario: UsuarioInterface;
}
 
export default RequestComUsuario;