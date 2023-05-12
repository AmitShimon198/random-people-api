import { ApolloError, useMutation } from '@apollo/client'
import { Person } from '../../models';
import { SAVE_PERSON } from '../../queries';
import { useMutateGetPeopleStoreData } from '../store';

export function useSavePerson(onError?: (error: ApolloError) => void) {
    const [savePersonMutation, { error, loading, }] = useMutation(SAVE_PERSON);
    const { readGetPeopleQuery, writeGetPeopleQuery } = useMutateGetPeopleStoreData();
    const savePerson = async (person: Person) => {
        const { __typename, type, ...restPerson } = person;
        const { location, dob, picture } = restPerson;
        const { __typename: _, ...restLocation } = location;
        const { __typename: __, ...restDob } = dob;
        const { __typename: ___, ...restPicture } = picture;
        return await savePersonMutation({
            variables: {
                person: {
                    ...restPerson,
                    dob: {
                        ...restDob
                    },
                    picture: {
                        ...restPicture
                    },
                    location: {
                        ...restLocation
                    }
                }
            },
            onError,
            onCompleted: async ({ savePerson }) => {
                await removePersonFromQuery(type, savePerson);
                await addPersonToQuery(savePerson);
            }
        })
    }
    return { savePerson, error, loading, }

    async function addPersonToQuery(savePerson: any) {
        const readRandomData = await readGetPeopleQuery();
        if (readRandomData?.getPeople) {
            writeGetPeopleQuery({ getPeople: [...readRandomData?.getPeople, savePerson] });
        }
    }

    async function removePersonFromQuery(type: string | undefined, savePerson: any) {
        const readRandomData = await readGetPeopleQuery(type);
        if (readRandomData?.getPeople) {
            const restPeoples = readRandomData?.getPeople.filter((p: Person) => savePerson._id !== p._id);
            if (restPeoples.length) {
                writeGetPeopleQuery({ getPeople: restPeoples }, type);
            }
        }
    }
}
