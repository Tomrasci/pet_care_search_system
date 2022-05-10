import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/interfaces/IUser';
import userService from '../services/user.service';
const jwt = require('jsonwebtoken');

const { TokenExpiredError } = jwt;

const catchError = (err, res: Response) => {
  if (err instanceof TokenExpiredError) {
    const msg = 'Unauthorized! Access Token was expired!';
    return res.status(401).send({ message: JSON.stringify(msg) });
  }
  const msg = 'Unauthorized!';
  return res.sendStatus(401).send({ message: JSON.stringify(msg) });
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({
      message: 'No token provided!'
    });
  }

  jwt.verify(token, process.env.Access_Token_Secret, (err, user: IUser) => {
    if (err) {
      return catchError(err, res);
    } else {
      req.body.user = user;
      return next();
    }
  });
};

const isCaretakerOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userService.getUserByEmail(req.body.user.email);
  if (user.role === 1 || user.role === 2) {
    return next();
  } else {
    return res.status(403).json('Caretaker or Admin role required!');
  }
};

const isOwnerOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userService.getUserByEmail(req.body.user.email);
  if (user.role === 1 || user.role === 3) {
    return next();
  } else {
    return res.status(403).json('Owner or Admin role required!');
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getUserByEmail(req.body.user.email);
  if (user.role === 1) {
    return next();
  } else {
    return res.status(403).json('Admin role required!');
  }
};

export default { verifyToken, isCaretakerOrAdmin, isOwnerOrAdmin, isAdmin };
