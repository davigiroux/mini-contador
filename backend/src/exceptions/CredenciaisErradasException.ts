import HttpException from "./HttpException";

class CredenciaisErradasException extends HttpException {
  constructor() {
    super(400, "Credenciais de autenticação incorretas");
  }
}
 
export default CredenciaisErradasException;