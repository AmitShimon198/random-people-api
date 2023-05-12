import { gql } from "@apollo/client";
import { CORE_PERSON_FIELDS } from "./fragments";

export const UPDATE_PERSON = gql`
 ${CORE_PERSON_FIELDS}
mutation UpdatePerson($_id:String, $name:String){
    updatePerson(args:{_id: $_id, name: $name}){
        ...CorePersonFields
    }
}`;