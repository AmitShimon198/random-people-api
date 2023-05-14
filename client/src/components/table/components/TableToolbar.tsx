import { ChangeEvent, FunctionComponent } from "react";
import { InputAdornment, Search, TextField, Toolbar } from "../../mui";

interface TableToolbarProps {
    title: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const textFieldSx = { width: '20%' };
const inputProps = {
    startAdornment: (
        <InputAdornment position="start">
            <Search />
        </InputAdornment>
    ),
};
const TableToolbar: FunctionComponent<TableToolbarProps> = ({ title, onInputChange }) => {
    return <Toolbar>
        <TextField
            sx={textFieldSx}
            InputProps={inputProps}
            label={`Filter ${title}`} variant='outlined' onChange={onInputChange} />
    </Toolbar>;
}

export default TableToolbar;