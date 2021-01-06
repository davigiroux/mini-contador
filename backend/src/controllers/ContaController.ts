import { Request, Response } from "express";
import Conta from "../models/Conta";

export const allContas = (req: Request, res: Response) => {
  const contas = Conta.find((err: any, contas: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(contas);
    }
  });
};

export const showConta = (req: Request, res: Response) => {
  const conta = Conta.findById(req.params.id, (err: any, conta: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(conta);
    }
  });
};

export const adicionarConta = (req: Request, res: Response) => {
  const conta = new Conta(req.body);
  conta.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(conta);
    }
  });
};

export const alterarConta = (req: Request, res: Response) => {
  let conta = Conta.findByIdAndUpdate(
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
};

export const deletarConta = (req: Request, res: Response) => {
  const conta = Conta.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Conta deleted from database");
    }
  });
};