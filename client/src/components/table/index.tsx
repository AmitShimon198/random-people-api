import { ChangeEvent, FunctionComponent, useState, useCallback, useMemo } from "react";
import {
    MuiTable, TableBody, Paper, Typography,
    TableHead, TableContainer, Box, debounce
} from "../mui";
import { TableBodyList, TableHeaderList, TableToolbar } from "./components";
import classes from "./index.module.css";
interface TableProps {
    records: any[];
    headers: string[];
    title: string;
    onRowClick?: (item?: any) => void | Promise<void>;
    onFilter?: (value: string, record: any) => boolean;
}

const Table: FunctionComponent<TableProps> = ({ onFilter, onRowClick, records, headers, title }) => {
    const [filterValue, setFilterValue] = useState<string>('');
    const onInputChange = useCallback(() => debounce((e: ChangeEvent<HTMLInputElement>) => setFilterValue?.(e.target.value), 500), []);
    const renderToolbar = !!(onFilter && typeof onFilter === 'function');
    const filteredRecords = useMemo(() => !!filterValue && renderToolbar ?
        records?.filter((record: any) => onFilter(filterValue, record)) :
        records, [records, filterValue, onFilter, renderToolbar]);
    return (<Box className={classes.container}>
        <Typography
            className={classes.header} variant="h4" id="tableTitle" component="div"
            marginBottom={2}
            width='90%'
        >
            {title}
        </Typography>
        <Paper className={classes.paper}>
            {renderToolbar && <TableToolbar title={title} onInputChange={onInputChange()} />}
            <TableContainer className={classes.table_container}>
                <MuiTable stickyHeader>
                    <TableHead>
                        <TableHeaderList headers={headers} />
                    </TableHead>
                    <TableBody>
                        <TableBodyList filteredRecords={filteredRecords} onRowClick={onRowClick}
                            headers={headers} />
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </Paper >
    </Box>);
}

export default Table;