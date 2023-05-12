import { model, Schema } from "mongoose";
import { Picture, Dob, Person, Location } from "../../people";

const locationSchema = new Schema<Location>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
});

const pictureSchema = new Schema<Picture>({
    large: { type: String, required: true },
    medium: { type: String, required: true },
    thumbnail: { type: String, required: true },
});

const dobSchema = new Schema<Dob>({
    date: { type: String, required: true },
    age: { type: Number, required: true },
});

const personSchema = new Schema<Person>({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: locationSchema, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    picture: { type: pictureSchema, required: true },
    dob: { type: dobSchema, required: true },
});

const PersonModel = model<Person>('Person', personSchema);

export default PersonModel;