import HttpException from "./HttpException";

class UsuarioComEsseEmailJaExisteException extends HttpException {
  constructor(email: string) {
    super(400, `Usuário com email ${email} já cadastrado`);
  }
}
 
export default UsuarioComEsseEmailJaExisteException;