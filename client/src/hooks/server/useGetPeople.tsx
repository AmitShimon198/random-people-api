import { ApolloError, useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries';

export function useGetPeople(onError?: ((error: ApolloError) => void) | undefined) {
    const { data, error, loading } = useQuery(GET_PEOPLE, {
        onError
    });
    return { data, error, loading }
}
