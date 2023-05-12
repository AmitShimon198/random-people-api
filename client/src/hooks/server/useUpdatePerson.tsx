import { ApolloError, useMutation } from "@apollo/client"
import { UPDATE_PERSON } from "../../queries"
import { useReadWritePersonFragment } from "../store";
import { Person, PersonState } from "../../models";

export function useUpdatePerson(onError?: (error: ApolloError) => void) {
    const [updatePersonDetails, { error, loading, data }] = useMutation(UPDATE_PERSON);
    const { writeStorePerson, readStorePerson } = useReadWritePersonFragment();
    const updatePerson = async (_id: string, name: string, type?: string) => {
        if (_id && name) {
            if (type !== PersonState.Random) {
                return await updatePersonDetails({
                    variables: {
                        name,
                        _id
                    },
                    onCompleted({ updatePerson }: { updatePerson: Person }) {
                        if (updatePerson._id) {
                            writeStorePerson(updatePerson._id, updatePerson)
                        }
                    },
                    onError
                })
            }
            const storePerson = readStorePerson(_id);
            writeStorePerson(_id, { ...storePerson, name });
        }
    }
    return { updatePerson, error, loading, data }
}
