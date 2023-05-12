import { Configuration } from "../../models";

export class AppConfig {
    private static instance: Configuration;
    static getInstance(): Configuration {
        if (!AppConfig.instance) {
            AppConfig.instance = new Configuration();
        }
        return AppConfig.instance;
    }
}

export default AppConfig.getInstance();