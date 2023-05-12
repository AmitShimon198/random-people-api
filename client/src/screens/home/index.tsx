import { FunctionComponent } from "react";
import { Button, Box, Stack } from "../../components";
import { useNavigate } from "react-router";
import { PersonState } from "../../models";

const Home: FunctionComponent = () => {
    const navigate = useNavigate();
    
    const fetchRandomMeUsers = async () => {
        navigate(`/${PersonState.Random}`);
    };

    const fetchDbUsers = async () => {
        navigate('/history');
    };

    return (<Box
        display='flex'
        height='90%'
        width='100%'
        position="relative"
        flexDirection='column'
    >
        <Box
            display='flex'
            height='90%'
            width='100%'
            position="relative"
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <Stack direction="row" spacing={2}>
                <Button
                    onClick={fetchRandomMeUsers} variant="outlined" >
                    Fetch
                </Button>
                <Button
                    onClick={fetchDbUsers} variant="outlined" >
                    History
                </Button>
            </Stack>
        </Box>
    </Box>
    );
}

export default Home;