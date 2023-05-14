import { FunctionComponent } from "react";
import { TableCell } from "../../mui";
import { StyledTableRow } from "./styled";

interface TableListBodyProps {
    filteredRecords: any[];
    onRowClick: ((item?: any) => void | Promise<void>) | undefined;
    headers: string[];
}
const TableBodyList: FunctionComponent<TableListBodyProps> = ({ filteredRecords, onRowClick, headers }) => {
    return (
        <>
            {filteredRecords.map((record: any, idx: number) =>
                <StyledTableRow onClick={onRowClick?.bind(null, record)} key={`${record._id}_${idx}`}>
                    {headers.map((header: string) => (
                        <TableCell key={`${header}_${record._id}`}>
                            {record[header]}
                        </TableCell>)
                    )}
                </StyledTableRow>
            )}
        </>
    );
}

export default TableBodyList;