import { useApolloClient } from '@apollo/client';
import { GET_PEOPLE } from '../../queries';

export function useReadRandomMeResults(type?: string) {
    const client = useApolloClient();
        return client.readQuery({
            query: GET_PEOPLE,
            variables: {
                type
            }
        });
}
