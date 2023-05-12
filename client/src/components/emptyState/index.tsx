import { FunctionComponent } from "react";
import { Box, CardMedia, Paper, Typography } from "../mui";
import EmptyStateImage from '../../assets/EmptyState.jpg';
import classes from './index.module.css';
import BackButton from "../backButton";
interface EmptyStateProps {
    text: string;
    onBackClick?: () => void | Promise<void>
}

const EmptyState: FunctionComponent<EmptyStateProps> = ({ text, onBackClick }) => {
    return (<>
        <Box className={classes.container}>
            <Paper className={classes.paper} elevation={3} >
                <BackButton onBackClick={onBackClick} />
                <Box className={classes.body}>
                    <CardMedia
                        component="img"
                        className={classes.image}
                        image={EmptyStateImage}
                        alt="Paella dish"
                    />
                </Box>
                <Typography className={classes.text}>{text}</Typography>
            </Paper>
        </Box>
    </>
    );
}

export default EmptyState;