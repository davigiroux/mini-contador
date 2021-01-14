import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import connect from "./connect";
import * as ContaController from './controllers/ContaController';

const app: Application = express();
const port: number = 5000 || process.env.PORT;
const db: string = "mongodb+srv://dev:RPf1mXtfyOcroyYA@cluster0.p7xx5.mongodb.net/MiniContador?retryWrites=true&w=majority"

connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


app.get("/contas", ContaController.allContas);

app.get("/contas/mesReferencia/:mesReferencia/anoReferencia/:anoReferencia", ContaController.buscarContasPorAnoEMes);

app.get("/contas/:id", ContaController.showConta);

app.post("/contas", ContaController.adicionarConta);

app.put("/contas/:id", ContaController.alterarConta);

app.delete("/contas/:id", ContaController.deletarConta);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});