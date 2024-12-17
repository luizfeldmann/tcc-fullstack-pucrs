import { TableCell, TableRow } from "@mui/material";
import { ITransactionColumns } from "./TransactionsTableColumn";
import { ITransactionResponseItemData } from "@/lib/schemas/dto/TransactionsRequestResponse";

/** Element for one row of the table */
export const TransactionRow = (props: {
  columns: ITransactionColumns[];
  row: ITransactionResponseItemData;
}) => {
  return (
    <TableRow hover tabIndex={-1} key={props.row._id}>
      {props.columns.map((column) => {
        return (
          <TableCell key={column.tag}>{column.format(props.row!)}</TableCell>
        );
      })}
    </TableRow>
  );
};
