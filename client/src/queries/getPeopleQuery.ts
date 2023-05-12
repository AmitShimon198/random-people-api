import { gql } from "@apollo/client";
import { CORE_PERSON_FIELDS } from "./fragments";
export const GET_PEOPLE = gql`
    ${CORE_PERSON_FIELDS}
    query GetPeople($type: String){
        getPeople(args: { type: $type }){
            ...CorePersonFields
        }
    }`;