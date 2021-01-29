import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import DadosNoToken from '../controllers/interfaces/dadosNoToken.interface';
import RequestComUsuario from '../controllers/interfaces/requestComUsuario.interface';
import TokenDeAutenticacaoFaltando from '../exceptions/TokenDeAutenticacaoFaltando';
import TokenDeAutenticacaoInvalido from '../exceptions/TokenDeAutenticacaoInvalido';
import Usuario from '../models/Usuario';
 
async function autorizacaoMiddleware(request: Request, response: Response, next: NextFunction) {
  const req = request as RequestComUsuario;
  const headers = req.headers;
  if (headers && headers.authorization && headers.authorization !== "") {
    const secret = process.env.JWT_SECRET;
    try {
      const token = headers.authorization.split(" ")[1];
      const respostaDeVerificacao = jwt.verify(token, secret || 'segredo') as DadosNoToken;
      const id = respostaDeVerificacao._id;
      const usuario = await Usuario.findById(id);
      if (usuario) {
        req.usuario = usuario;
        next();
      } else {
        next(new TokenDeAutenticacaoInvalido());
      }
    } catch (error) {
      next(new TokenDeAutenticacaoInvalido());
    }
  } else {
    next(new TokenDeAutenticacaoFaltando());
  }
}
 
export default autorizacaoMiddleware;