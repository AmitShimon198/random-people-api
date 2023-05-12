import { FunctionComponent } from 'react';
import { Box, LinearProgress } from '../mui';
import classes from "./index.module.css";
const Progress: FunctionComponent = () => {
    return (<Box
        height='90%'
        width='100%'
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <LinearProgress className={classes.progress} color="inherit" />
    </Box>);
}

export default Progress;