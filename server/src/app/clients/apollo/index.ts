
import { createServer } from 'http';
import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import resolvers from './resolvers';
import { Configuration } from '../../../models';


const createApolloServer = async (app: Express, appConfig: Configuration) => {
    const httpServer = createServer(app);
    const schema = await buildSchema({
        resolvers: resolvers,
        validate: false,
        emitSchemaFile: true,
        nullableByDefault: true
    });
    const server = new ApolloServer({
        schema: schema,
        csrfPrevention: true,
        cache: "bounded",
    });
    await server.start()
    server.applyMiddleware({ app, path: appConfig.apolloServerPath, cors: false });
    return { httpServer };
}

export default createApolloServer;