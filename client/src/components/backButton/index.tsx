import { FunctionComponent } from "react";
import { ArrowBackIos, IconButton } from "../mui";

interface BackButtonProps {
    onBackClick?: () => void | Promise<void>
}

const BackButton: FunctionComponent<BackButtonProps> = ({ onBackClick }) => {
    return (<IconButton onClick={onBackClick}><ArrowBackIos /></IconButton>);
}

export default BackButton;