import mongoose, { Connection } from "mongoose";

export class MongoStorage {

    private readonly _url: string;
    client: Connection | undefined;
    constructor(connectionString: string) {
        this._url = connectionString;
    }
    async connect(): Promise<Connection> {
        if (!this.client) {
            mongoose.set('strictQuery', true);
            await mongoose.connect(this._url);
            this.client = mongoose.connection;
        }
        return this.client;
    }
}
