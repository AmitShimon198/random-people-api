import express, { Express } from 'express';
import cookieParser from "cookie-parser";
import { corsMiddleware } from "../middleware";
import createApolloServer from "../clients/apollo";
import { Configuration } from '../../models';
import { initDb } from '../clients';

const configureApp = async (app: Express, appConfig: Configuration) => {
    app.use(cookieParser());
    app.use(express.json());
    app.use(corsMiddleware(app));
    const { httpServer } = await createApolloServer(app, appConfig);
    await initDb(appConfig.dbConnectionString || '');
    return httpServer;
}

export default configureApp;