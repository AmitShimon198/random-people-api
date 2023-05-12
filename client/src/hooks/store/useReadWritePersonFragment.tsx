import { useApolloClient } from "@apollo/client";
import { CORE_PERSON_FIELDS } from "../../queries/fragments";
import { Person } from "../../models";

export function useReadWritePersonFragment() {
    const client = useApolloClient();
    const readStorePerson = (id: string) => {
        return client.readFragment({
            id: `PersonType:${id}`,
            fragment: CORE_PERSON_FIELDS,
            fragmentName: 'CorePersonFields'
        });
    }
    const writeStorePerson = (id: string, data: Person) => {
        return client.writeFragment({
            id: `PersonType:${id}`,
            fragment: CORE_PERSON_FIELDS,
            fragmentName: 'CorePersonFields',
            data
        });
    }
    return { readStorePerson, writeStorePerson }
}
