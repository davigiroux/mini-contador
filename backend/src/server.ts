import App from './app';
import AutenticacaoController from './controllers/AutenticacaoController';
import ContaController from './controllers/ContaController';
 
const app = new App(
  [
      new AutenticacaoController(),
      new ContaController()
  ],
  5000,
);
 
app.listen();