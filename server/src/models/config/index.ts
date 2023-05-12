import 'dotenv/config';
class Configuration {
    port: string | undefined;
    dbConnectionString: string | undefined;
    allowedOrigins: string[];
    apolloServerPath?: string;

    constructor() {
        this.port = process.env.PORT;
        this.dbConnectionString = process.env.DB_CONNECTION_STRING;
        this.allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
        this.apolloServerPath = process.env.APOLLO_SERVER_PATH;
    }
}

export default Configuration;