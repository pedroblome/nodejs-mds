import { Router, Request, Response } from "express";

const router = Router();

router.get("/teste", (req: Request, res:Response) => {
  throw new Error(" nome: pizza de calabresa com frango")
});

export {router} 


