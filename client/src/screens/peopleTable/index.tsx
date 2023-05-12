import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { BackButton, EmptyState, Table } from "../../components";
import { Person } from "../../models";
import classes from './index.module.css';
import Profile from "../profile";
import { useNavigate } from "react-router";
import { useReadRandomMeResults } from "../../hooks";
type SanitizedPerson = {
    _id: string;
    name: string;
    gender: string;
    country: string;
    phone: string;
    email: string;
    thumbnail: React.ReactNode;
}
interface PeopleTableProps {
    type?: string;
}
const headers = ['thumbnail', 'name', 'gender', 'country', 'phone', 'email'];

const PeopleTable: FunctionComponent<PeopleTableProps> = ({ type }) => {
    const navigate = useNavigate();
    const res = useReadRandomMeResults(type);
    const [selectedProfile, setSelectedProfile] = useState<{ person: Person; type?: string }>()
    const records: SanitizedPerson[] = useMemo(() => res?.getPeople?.map?.((record: Person) => ({
        thumbnail: <img className={classes.thumbnail} alt='thumbnail' src={record.picture.thumbnail} />,
        _id: record._id,
        name: record.name,
        gender: record.gender,
        country: record.location.country,
        phone: record.phone,
        email: record.email,
    })) || [], [res?.getPeople]);

    const onRecordClick = useCallback((item: Person) => {
        setSelectedProfile({ type, person: item });
    }, [type]);

    const onBackClick = useCallback(() => {
        setSelectedProfile(undefined);
    }, []);

    const onNavigation = useCallback(() => navigate('/home'), [navigate]);

    const onFilterHandler = useCallback(
        (value: string, record: any) =>
            record?.name?.toLowerCase()?.includes(value) ||
            record.country?.toLowerCase()?.includes(value),
        []);

    if (!res?.getPeople?.length) {
        return (<EmptyState onBackClick={onNavigation} text={'No items to display. Start exploring to find something interesting!'} />)
    }

    return (<>
        {!!records.length && !selectedProfile &&
            <>
                <BackButton onBackClick={onNavigation} />
                <Table
                    onRowClick={onRecordClick}
                    onFilter={onFilterHandler}
                    title={`${type || ''} people`}
                    headers={headers}
                    records={records} />
            </>
        }
        {selectedProfile?.person && <Profile
            onBackClick={onBackClick}
            personId={selectedProfile?.person?._id}
        />}
    </>
    );
}

export default PeopleTable;