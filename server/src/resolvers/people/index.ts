import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { peopleService } from "../../services";
import { DeletePersonArgs, GetPeopleArgs, Person, SavePersonArgs, UpdatePersonArgs } from "../../models";

@Resolver()
class People {
    @Query(() => [Person])
    async getPeople(@Arg("args", () => GetPeopleArgs) args: GetPeopleArgs): Promise<Person[] | []> {
        const { skip } = args;
        return peopleService.getPeople(skip);
    }

    @Mutation(() => Person)
    async savePerson(@Arg("args", () => SavePersonArgs) args: SavePersonArgs): Promise<Person> {
        return peopleService.savePerson(args.person);
    }

    @Mutation(() => Boolean)
    async deletePerson(@Arg("args", () => DeletePersonArgs) args: DeletePersonArgs): Promise<boolean> {
        return peopleService.deletePerson(args._id);
    }

    @Mutation(() => Person)
    async updatePerson(@Arg("args", () => UpdatePersonArgs) args: UpdatePersonArgs): Promise<Person | null> {
        return peopleService.updatePerson(args._id, args.name);
    }
}

export default People;