import { ApolloClient, NormalizedCacheObject, InMemoryCache } from '@apollo/client';

import appConfig from '../config';

class ApolloProvider {
    client?: ApolloClient<NormalizedCacheObject>;
    static instance: ApolloProvider;

    constructor() {
        this._initializeApolloClient();
    }
    static getInstance() {
        if (!ApolloProvider.instance) {
            ApolloProvider.instance = new ApolloProvider();
        }
        return ApolloProvider.instance;
    }
    _initializeApolloClient() {
        this.client = new ApolloClient({
            cache: new InMemoryCache(),
            uri: appConfig.serverUrl
        });
    }

}
export default ApolloProvider.getInstance();


