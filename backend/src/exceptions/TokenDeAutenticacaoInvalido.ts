import HttpException from "./HttpException";

class TokenDeAutenticacaoInvalido extends HttpException {
  constructor() {
    super(401, "Token de autenticação inválido");
  }
}
 
export default TokenDeAutenticacaoInvalido;