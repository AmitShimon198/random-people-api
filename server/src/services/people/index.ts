import { Person, PersonModel } from "../../models";
import { ApolloError } from "apollo-server-core";

class PeopleService {
    static instance?: PeopleService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new PeopleService();
        }
        return this.instance;
    }
    async updatePerson(_id: string, name: string): Promise<Person | null> {
        try {
            const savedDoc = await PersonModel.findOneAndUpdate({ _id }, { name }, {
                new: true,
            });
            return savedDoc;
        } catch (error) {
            throw new ApolloError('Oops! Unable to update your data. Please try again later.');
        }
    }

    async deletePerson(_id: string): Promise<boolean> {
        try {
            return !!await PersonModel.findOneAndRemove({ _id });
        } catch (error) {
            throw new ApolloError('Oops! Unable to delete your data. Please try again later.');
        }
    }

    async savePerson(person: Person): Promise<Person> {
        try {
            const savedDoc = await PersonModel.findOneAndUpdate({ _id: person._id }, person, {
                new: true,
                upsert: true,
            });
            return savedDoc;
        } catch (error) {
            throw new ApolloError('Oops! Unable to save your data. Please try again later.');
        }
    }

    private async getDbPeople(skip: number | undefined): Promise<Person[]> {
        return await PersonModel.find({}, {}, { skip: skip, limit: 10 });
    }

    async getPeople(skip: number | undefined): Promise<Person[]> {
        try {
            return await this.getDbPeople(skip);
        } catch (error) {
            throw new ApolloError('User info unavailable. Try again later or contact support.');
        }
    }
}

export default PeopleService.getInstance()