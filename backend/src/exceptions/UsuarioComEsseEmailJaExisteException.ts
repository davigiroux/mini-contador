import HttpException from "./HttpException";

class UsuarioComEsseEmailJaExisteException extends HttpException {
  constructor(email: string) {
    super(404, `Usuário com email ${email} já cadastrado`);
  }
}
 
export default UsuarioComEsseEmailJaExisteException;