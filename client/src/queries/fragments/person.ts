import { gql } from '@apollo/client';

export const CORE_PERSON_FIELDS = gql`
fragment CorePersonFields on PersonType {
    _id
    name
    gender
    location {
        country
        street
        city
        state
    }
    phone
    email
    type 
    dob {
        date
        age
    }
    picture {
        thumbnail
        large
    }
}`;
