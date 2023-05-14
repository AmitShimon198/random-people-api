import { FunctionComponent } from "react";
import { TableRow } from "../../mui";
import { StyledTableCell } from "./styled";
import classes from "../index.module.css";
interface TableHeaderListProps {
    headers: string[];
}
const TableHeaderList: FunctionComponent<TableHeaderListProps> = ({ headers }) => {
    return <TableRow className={classes.table_head}>
        {headers.map((header: string) => <StyledTableCell key={`${header}_header`}>{header}</StyledTableCell>)}
    </TableRow>;
}

export default TableHeaderList;