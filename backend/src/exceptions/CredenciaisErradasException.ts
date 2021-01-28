import HttpException from "./HttpException";

class CredenciaisErradasException extends HttpException {
  constructor() {
    super(404, "Credenciais de autenticação incorretas");
  }
}
 
export default CredenciaisErradasException;