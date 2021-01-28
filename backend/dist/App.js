"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectDb_1 = __importDefault(require("./connectDb"));
const erro_middleware_1 = __importDefault(require("./middleware/erro.middleware"));
class App {
    constructor(controllers, port) {
        this.conectarAoBancoDeDados = () => {
            const db = "mongodb+srv://dev:RPf1mXtfyOcroyYA@cluster0.p7xx5.mongodb.net/MiniContador?retryWrites=true&w=majority";
            connectDb_1.default(db);
        };
        this.inicializarCors = () => {
            this.app.use(function (_req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
                next();
            });
        };
        this.inicializarMiddlewareDeErro = () => {
            this.app.use(erro_middleware_1.default);
        };
        this.app = express_1.default();
        this.port = port;
        this.conectarAoBancoDeDados();
        this.initializeMiddlewares();
        this.inicializarCors();
        this.initializeControllers(controllers);
        this.inicializarMiddlewareDeErro();
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map