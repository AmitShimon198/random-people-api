import { ChangeEvent, FunctionComponent, useState } from "react";
import {
    MuiTable, TableBody, TableRow, TableCell, Paper, Typography,
    TableHead, TableContainer, Box, styled, tableCellClasses,
    Toolbar, TextField, debounce, InputAdornment, Search
} from "../mui";
import classes from "./index.module.css";
interface TableProps {
    records: any[];
    headers: string[];
    title: string;
    onRowClick?: (item?: any) => void | Promise<void>;
    onFilter?: (value: string, record: any) => boolean;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#C5BDDC',
        color: theme.palette.common.black,
        fontWeight: 500
    },
    [`&.${tableCellClasses.head}:first-letter`]: {
        textTransform: 'uppercase'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const Table: FunctionComponent<TableProps> = ({ onFilter, onRowClick, records, headers, title }) => {
    const [filterValue, setFilterValue] = useState<string>('');
    const onInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => setFilterValue?.(e.target.value), 300);
    const filteredRecords = !!filterValue && typeof onFilter === 'function' ? records?.filter((record: any) => onFilter(filterValue, record)) : records;
    return (<Box className={classes.container}>
        <Typography
            className={classes.header}
            variant="h4"
            id="tableTitle"
            component="div"
            marginBottom={2}
            width={'90%'}
        >
            {title}
        </Typography>
        <Paper className={classes.paper}>
            {onFilter && typeof onFilter === 'function' && <Toolbar>
                <TextField
                    sx={{ width: '20%' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    label={`Filter ${title}`} variant='outlined' onChange={onInputChange} />
            </Toolbar>}
            <TableContainer className={classes.table_container}>
                <MuiTable stickyHeader>
                    <TableHead>
                        <TableRow className={classes.table_head}>
                            {headers.map((header: string) => <StyledTableCell key={`${header}_header`}>{header}</StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecords.map((record: any, idx: number) =>
                            <StyledTableRow onClick={onRowClick?.bind(null, record)} key={`${record._id}_${idx}`}>{
                                headers.map((header: string) => {
                                    return <TableCell key={`${header}_${record._id}`}>{record[header]}</TableCell>
                                })
                            }
                            </StyledTableRow>
                        )}
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </Paper >
    </Box>
    );
}

export default Table;