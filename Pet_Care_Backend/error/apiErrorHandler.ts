import {Request, Response, NextFunction} from "express";
import ApiError from "./ApiError";

export default function apiErrorHandler(err, req : Request, res : Response, next : NextFunction) {
    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json("Something went wrong");
}
