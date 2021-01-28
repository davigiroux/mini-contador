import HttpException from "./HttpException";

class TokenDeAutenticacaoFaltando extends HttpException {
  constructor() {
    super(401, "Não existe um token de autenticação do usuário");
  }
}
 
export default TokenDeAutenticacaoFaltando;