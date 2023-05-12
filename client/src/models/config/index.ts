export class Configuration {
    serverUrl?: string;
    randomMeAPI?: string;
    constructor() {
        this.serverUrl = process.env.REACT_APP_SERVER_URL;
        this.randomMeAPI = process.env.REACT_APP_RANDOM_ME_API;
    }
}