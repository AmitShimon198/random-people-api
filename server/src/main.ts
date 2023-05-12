
import 'reflect-metadata'
import express from 'express';
import { configureApp, appConfig } from './app';
const app = express();
const port = appConfig.port;

async function main() {
    try {
        const httpServer = await configureApp(app, appConfig);
        httpServer.listen(port, async () => {
            console.log(`app listening on port ${port}`)
        });
    } catch (error) {
        console.log('app error', { error });
    }
}

main();