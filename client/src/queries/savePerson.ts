import { gql } from "@apollo/client";
import { CORE_PERSON_FIELDS } from "./fragments";

export const SAVE_PERSON = gql`
${CORE_PERSON_FIELDS}
mutation SavePerson($person: PersonInput){
    savePerson(args:{ person: $person }){
        ...CorePersonFields
    }
}
`;