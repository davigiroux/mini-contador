import * as bcrypt from 'bcrypt';
import * as express from 'express';
import jwt from 'jsonwebtoken';
import UsuarioComEsseEmailJaExiste from '../exceptions/UsuarioComEsseEmailJaExisteException';
import CredenciaisErradas from '../exceptions/CredenciaisErradasException';
import Controller from './interfaces/controller.interface';
import validationMiddleware from '../middleware/validacao.middlware';
import CriarUsuarioDto from './dto/usuario.dto';
import Usuario, { UsuarioInterface } from '../models/Usuario';
import LoginDto from './dto/login.dto';
import DadosNoToken from './interfaces/dadosNoToken.interface';
 
interface TokenData {
    token: string;
    expiresIn: number;
}

class AutenticacaoController implements Controller {
  public path = '/autenticacao';
  public router = express.Router();
  private usuario = Usuario;
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post(`${this.path}/registrar`, validationMiddleware(CriarUsuarioDto), this.registrar);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.logar);
  }
 
  private registrar = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CriarUsuarioDto = request.body;
    const usuarioComEmail = await this.usuario.findOne({ email: userData.email });
    if (usuarioComEmail) {
      next(new UsuarioComEsseEmailJaExiste(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.senha, 10);
      const user = await this.usuario.create({
        ...userData,
        senha: hashedPassword,
      });
      user.senha = '';
      const tokenData = this.createToken(user);
      response.send({token: tokenData});
    }
  }
   
  private logar = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const dadosDeLogin: LoginDto = request.body;
    const usuario = await this.usuario.findOne({ email: dadosDeLogin.email });
    if (usuario) {
      const isPasswordMatching = await bcrypt.compare(dadosDeLogin.senha, usuario.senha);
      if (isPasswordMatching) {
        usuario.senha = '';
        const tokenData = this.createToken(usuario);
        response.send({token: tokenData});
      } else {
        next(new CredenciaisErradas());
      }
    } else {
      next(new CredenciaisErradas());
    }
  }

  private createToken(usuario: UsuarioInterface): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DadosNoToken = {
      _id: usuario._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret || 'segredo', { expiresIn }),
    };
  }
}
 
export default AutenticacaoController;