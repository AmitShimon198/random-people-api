import { useState, useCallback } from 'react'
import { appConfig } from '../../services';
import { useMutateGetPeopleStoreData } from '../store';
import ObjectID from 'bson-objectid';
import { PersonState } from '../../models';

export function useGetRandomMeApi(onError?: (() => void) | undefined) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();
    const { readGetPeopleQuery, writeGetPeopleQuery } = useMutateGetPeopleStoreData();
    const fetchRandomPerson = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${appConfig.randomMeAPI}?results=${10}`);
            const { results } = await response.json();
            const mappedResults = results.map((person: any, idx: number) => {
                const newId = new ObjectID();
                const {
                    name: { title, first, last },
                    gender,
                    location: { city, country, state, street: { name, number } },
                    phone,
                    email,
                    dob,
                    picture
                } = person;
                return {
                    _id: newId.toHexString(),
                    name: `${title} ${first} ${last}`,
                    gender,
                    location: { __typename: "LocationType", city, country, state, street: `${name} ${number}` },
                    phone,
                    email,
                    type: PersonState.Random,
                    dob: { __typename: "DobType", ...dob, },
                    picture: { __typename: "PictureType", ...picture, },
                    __typename: 'PersonType'
                }
            });

            const data = await readGetPeopleQuery(PersonState.Random);
            writeGetPeopleQuery({ getPeople: [...(data?.getPeople || []), ...mappedResults] }, PersonState.Random);
            setLoading(false);
            return mappedResults;
        } catch (error: any) {
            setError(error);
            setLoading(false)
            if (typeof onError === 'function') { onError(); }
        }
    }, [onError, readGetPeopleQuery, writeGetPeopleQuery])
    return { fetchRandomPerson, loading, error }
}
