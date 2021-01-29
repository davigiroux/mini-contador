import App from './app';
import AutenticacaoController from './controllers/AutenticacaoController';
import ContaController from './controllers/ContaController';

const porta = Number(process.env.PORT) || 3000;

const app = new App(
  [
      new AutenticacaoController(),
      new ContaController()
  ],
  porta,
);
 
app.listen();