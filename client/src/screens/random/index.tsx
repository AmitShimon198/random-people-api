import { FunctionComponent, useEffect, useState, useCallback } from 'react';
import PeopleTable from '../peopleTable';
import { useGetRandomMeApi, useReadRandomMeResults } from '../../hooks';
import { PersonState } from '../../models';
import { Progress, Toaster } from '../../components';

const Random: FunctionComponent = () => {
    const [displayError, setDisplayError] = useState<boolean>(false);
    const toggleError = useCallback(() => setDisplayError(prev => !prev), [])
    useReadRandomMeResults(PersonState.Random);
    const { loading, fetchRandomPerson } = useGetRandomMeApi(toggleError);
    useEffect(() => {
        fetchRandomPerson()
    }, [fetchRandomPerson])

    return (<>
        <Toaster
            message="Error fetching data please try again later."
            display={!!displayError}
            onActionClick={toggleError}
            severity="error" />
        {loading && <Progress />}
        {!loading && <PeopleTable type={PersonState.Random} />}
    </>
    );
}

export default Random;