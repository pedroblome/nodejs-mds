import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //receive the token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    //validate the token
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    
    //restore the token id and put it inside a user_id variable inside the request.
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
