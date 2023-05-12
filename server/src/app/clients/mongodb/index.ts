import { MongoStorage } from "./MongoStorage";


const initDb = async (connectionString: string) => {
    if (!connectionString) {
        throw new Error('No connection string was supply')
    }
    const db = new MongoStorage(connectionString);
    return await db.connect()
}

export default initDb;