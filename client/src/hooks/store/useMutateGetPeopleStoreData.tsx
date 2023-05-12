import { useApolloClient } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import { useCallback } from "react";

export function useMutateGetPeopleStoreData() {
    const client = useApolloClient();
    const readGetPeopleQuery = useCallback(async (type?: string) => {
        return await client.readQuery({
            query: GET_PEOPLE,
            variables: {
                type
            }
        });
    }, [client])
    const writeGetPeopleQuery = useCallback((data: any, type?: string) => {
        client.writeQuery({
            query: GET_PEOPLE,
            variables: {
                type
            },
            data
        });
    }, [client])

    return { readGetPeopleQuery, writeGetPeopleQuery }
}
