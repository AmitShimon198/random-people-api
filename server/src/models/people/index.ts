import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class GetPeopleArgs {
    @Field(() => String)
    type?: string;
    @Field(() => Number, { nullable: true })
    skip?: number;
}
@InputType()
export class SavePersonArgs {
    @Field(() => Person)
    person: Person
}
@InputType()
export class DeletePersonArgs {
    @Field(() => String)
    _id: string
}
@InputType()
export class UpdatePersonArgs {
    @Field(() => String)
    _id: string
    @Field(() => String)
    name: string
}

@ObjectType('LocationType')
@InputType('LocationInput')
export class Location {
    @Field(() => String)
    street: string;
    @Field(() => String)
    city: string;
    @Field(() => String)
    state: string;
    @Field(() => String)
    country: string;
}

@ObjectType('PictureType')
@InputType('PictureInput')
export class Picture {
    @Field(() => String)
    large: string;
    @Field(() => String)
    medium: string;
    @Field(() => String)
    thumbnail: string;
}

@ObjectType('DobType')
@InputType('DobInput')
export class Dob {
    @Field(() => String)
    date: string;
    @Field(() => Number)
    age: number;
}

@ObjectType('PersonType')
@InputType('PersonInput')
export class Person {
    @Field(() => String)
    _id: string;
    @Field(() => String)
    name: string;
    @Field(() => String)
    gender: string;
    @Field(() => Location)
    location: Location;
    @Field(() => String)
    email: string;
    @Field(() => String)
    phone: string;
    @Field(() => String, { nullable: true })
    type?: string;
    @Field(() => Picture)
    picture: Picture;
    @Field(() => Dob)
    dob: Dob;
}