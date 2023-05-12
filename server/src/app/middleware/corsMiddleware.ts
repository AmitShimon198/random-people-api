import { Application, NextFunction, Request, Response } from "express";
import { ICorsMiddlewareOptions } from "../../models";
import cors from 'cors';
import { appConfig } from "..";

const corsOptions =  (req: Request, callback: any) => {
    const { allowedOrigins }: ICorsMiddlewareOptions = appConfig;
    const canAccess = !!allowedOrigins.find((origin: string) => origin === req.header('origin'))
    const options = {
        origin: canAccess,
    }
    callback(null, options)
}

export default (app: Application) => {
    app.use('*', cors(corsOptions));
    app.options('*', cors(corsOptions));
    return (_: Request, __: Response, next: NextFunction) => {
        return next();
    }
}