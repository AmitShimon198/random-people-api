import { FunctionComponent, useState } from 'react';
import { useGetPeople } from '../../hooks';
import { Progress, Toaster } from '../../components';
import PeopleTable from '../peopleTable';

const History: FunctionComponent = () => {
    const [displayError, setDisplayError] = useState<boolean>(false);
    const toggleError = () => {
        setDisplayError(prev => !prev)
    }
    const { loading } = useGetPeople(toggleError);
    return (<>
        <Toaster
            message="Error fetching data please try again later."
            display={!!displayError}
            onActionClick={toggleError}
            severity="error" />
        {loading && <Progress />}
        {!loading && !displayError && <PeopleTable />}
    </>);
}

export default History;