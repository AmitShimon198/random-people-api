import { ApolloCache, ApolloError, useMutation } from "@apollo/client"
import { DELETE_PERSON } from "../../queries"

export function useDeletePerson(onCompleted?: () => Promise<void> | void, onError?: (error: ApolloError) => void) {
    const [deletePersonMutation, { error, loading, data }] = useMutation(DELETE_PERSON);
    const deletePerson = async (_id: string) => {
        return await deletePersonMutation({
            variables: {
                _id
            },
            onCompleted,
            update(cache: ApolloCache<any>) {
                cache.evict({ id: `PersonType:${_id}` });
                cache.gc();
            },
            onError
        })
    }
    return { deletePerson, error, loading, data };
}
