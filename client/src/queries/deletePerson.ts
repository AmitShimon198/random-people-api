import { gql } from "@apollo/client";

export const DELETE_PERSON = gql`
   mutation DeletePerson($_id:String){
        deletePerson(args:{_id:$_id})
    }
`;