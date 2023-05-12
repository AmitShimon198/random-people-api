import { useReadWritePersonFragment } from "./useReadWritePersonFragment";

export function useGetPerson(id?: string) {
    const { readStorePerson } = useReadWritePersonFragment();
    if (!id) {
        return;
    }
    return readStorePerson(id)
}
