import { TableCell, TableRow, styled, tableCellClasses } from "../../mui";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
