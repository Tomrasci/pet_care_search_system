import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/interfaces/IUser';
const jwt = require("jsonwebtoken");


const {TokenExpiredError} = jwt;


const catchError = (err, res : Response) => {
    if (err instanceof TokenExpiredError) {
        const msg= "Unauthorized! Access Token was expired!";
        return res.status(401).send({message: JSON.stringify(msg)})
    }
    const msg = "Unauthorized!"
    return res.sendStatus(401).send({ message: JSON.stringify(msg) });
}

const verifyToken = (req : Request, res : Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.Access_Token_Secret, (err, user : IUser ) => {
        if (err) {
        return catchError(err, res);
        }
        else {
        req.body.user = user;
        next()
        }
    })

}

export default {verifyToken}