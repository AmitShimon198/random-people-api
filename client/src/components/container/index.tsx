import { FunctionComponent } from "react";
import { storeService } from "../../services";
import { ApolloProvider } from "@apollo/client";

interface AppContainerProps {
    children: React.ReactNode;
}

const AppContainer: FunctionComponent<AppContainerProps> = ({ children }) => {
    return (<ApolloProvider client={storeService.client!}>
        {children}
    </ApolloProvider>);
}

export default AppContainer;