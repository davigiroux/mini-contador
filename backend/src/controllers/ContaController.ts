import express, { NextFunction, Request, Response } from "express";
import autorizacaoMiddleware from "../middleware/autorizacao.middleware";
import Conta, {ContaInterface, StatusDaConta} from "../models/Conta";
import Controller from "./interfaces/controller.interface";

class ContaController implements Controller {
  public path = '/contas';
  public router = express.Router();

  constructor() {
    this.inicializarRotas();
  }

  private inicializarRotas() {
    this.router.get(`${this.path}/usuario/:idUsuario`, autorizacaoMiddleware, this.buscarContasDoUsuarioPorAnoEMes);
    this.router.get(`${this.path}/:id`, autorizacaoMiddleware, this.buscarConta);
    this.router.post(`${this.path}`, autorizacaoMiddleware, this.adicionarConta);
    this.router.put(`${this.path}/:id`, autorizacaoMiddleware, this.alterarConta);
    this.router.post(`${this.path}/:id/pagar`, autorizacaoMiddleware, this.pagarConta);
    this.router.delete(`${this.path}/:id`, autorizacaoMiddleware, this.deletarConta);
  }

  private buscarConta = async (req: Request, res: Response) => {
    Conta.findById(req.params.id, (err: any, conta: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(conta);
      }
    });
  }

  private adicionarConta = async (req: Request, res: Response) => {
    const conta = new Conta(req.body);
    conta.status = StatusDaConta.Pendente;
    conta.save((err: any) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(conta);
      }
    });
  }

  private alterarConta = async (req: Request, res: Response) => {
    Conta.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, conta: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(conta);
        }
      }
    );
  }

  private deletarConta = async (req: Request, res: Response) => {
    Conta.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send({status: 'success'});
      }
    });
  }

  private buscarContasDoUsuarioPorAnoEMes = async (req: Request, res: Response) => {
    const {anoReferencia, mesReferencia} = req.query;
    const idUsuario = req.params.idUsuario;
    Conta
    .where('usuario').equals(idUsuario)
    .where('dataReferencia.mes').equals(mesReferencia)
    .where('dataReferencia.ano').equals(anoReferencia)
    .exec((erro: Response, resultado: Response) => {
      if(erro)
        res.status(400).send(erro)
      else
        res.send(resultado)

    });
  }

  private pagarConta = async (req: Request, res: Response) => {
    const conta = await Conta.findById(req.params.id);
    if(conta) {
      conta.status = StatusDaConta.Paga;
      conta.save();

      res.send(conta);
    } else {
      res.status(400).send('Erro ao pagar conta');
    }
  }
}

export default ContaController;