import { FunctionComponent, MouseEventHandler } from "react";
import { Alert, AlertColor, Close, IconButton, Typography } from "../mui";
import classes from "./index.module.css";
interface ToasterProps {
    display?: boolean;
    severity?: AlertColor | undefined;
    message: string;
    onActionClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const sx = {
    '.MuiAlert-message': {
        overflow: 'hidden'
    }
};
const Toaster: FunctionComponent<ToasterProps> = ({ onActionClick, display, severity, message }) => {
    const action = typeof onActionClick === 'function' ? <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={onActionClick}
    >
        <Close fontSize="inherit" />
    </IconButton> : <></>
    return (
    <Alert action={action} sx={sx} className={`${classes.alert} ${display && classes.alert_show}`} severity={severity}>
        <Typography>{message}</Typography>
    </Alert>
    );
}

export default Toaster;