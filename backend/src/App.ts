import express, { Application } from "express";
import bodyParser from "body-parser";
import connect from "./connectDb";
import erroMiddleware from "./middleware/erro.middleware";
import Controller from "./controllers/interfaces/controller.interface";

class App {
  public app: Application;
  public port: number;
 
  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;
 
    this.conectarAoBancoDeDados();
    this.initializeMiddlewares();
    this.inicializarCors();
    this.initializeControllers(controllers);
    this.inicializarMiddlewareDeErro();
  }

  private conectarAoBancoDeDados = () => {
    const db: string = "mongodb+srv://dev:RPf1mXtfyOcroyYA@cluster0.p7xx5.mongodb.net/MiniContador?retryWrites=true&w=majority"
    connect(db);
  }

  private inicializarCors = () => {
    this.app.use(function(_req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
  }

  private inicializarMiddlewareDeErro = () => {
    this.app.use(erroMiddleware);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;