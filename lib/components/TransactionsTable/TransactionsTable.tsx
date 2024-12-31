"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { useAuthContext } from "../Providers/AuthProvider";
import { useMemo, useState } from "react";
import { createColumns } from "./TransactionsTableColumn";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TransactionRow } from "./TransactionTableRow";
import { useTransactionsQuery } from "@/lib/hooks/useTransactionsQuery";

/**
 * Table listing transactions as rows
 */
export const TransactionsTable = () => {
  // Use localication
  const { locale, LL } = useI18nContext();

  // Create table columns from the localization
  const columns = useMemo(() => {
    return createColumns(locale, LL);
  }, [locale, LL]);

  // Pagination control
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Read the transactions list from the server
  const authContext = useAuthContext();
  const transactions = useTransactionsQuery(
    authContext?.token,
    rowsPerPage,
    page * rowsPerPage
  );

  // Skeleton while loading
  if (!transactions.isSuccess) return <LinearProgress />;

  // Render the table
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.tag}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.data.items.map((row) => {
              return (
                <TransactionRow key={row._id} row={row} columns={columns} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={transactions.data.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
