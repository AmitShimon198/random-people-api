interface Location {
    city: string;
    __typename: string;
    country: string;
    state: string;
    street: string;
  }
  
  interface Dob {
    date: string;
    __typename: string;
    age: number;
  }
  
  interface Picture {
    large: string;
    __typename: string;
    medium: string;
    thumbnail: string;
  }
  
  export interface Person {
    _id: string;
    __typename: string;
    name: string;
    gender: string;
    location: Location;
    phone: string;
    email: string;
    type?: string;
    dob: Dob;
    picture: Picture;
  }