import { ReactNode, useEffect, useMemo, useState } from "react";
import { useI18nContext } from "../../../localization/i18n-react";
import {
  Locales,
  TranslationFunctions,
} from "../../../localization/i18n-types";
import {
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { ETransactionType, TransactionRequest } from "./TransactionsRequest";
import { useAuthContext } from "../../../hooks/useAuth";

/** Data for one row in the table */
interface ITransactionRow {
  _id: string;
  value: number;
  description: ETransactionType;
  date: Date;
}

/** Describes each column */
interface ITransactionColumns {
  tag: keyof ITransactionRow;
  label: string;
  minWidth?: number;
  format: (row: ITransactionRow) => ReactNode;
}

/** Creates the collection of columns from the translation */
const createColumns = (
  locale: Locales,
  LL: TranslationFunctions
): ITransactionColumns[] => {
  /** Rules to format the currency */
  const currencyFmt = Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  });

  /** Rules to format the date-time */
  const dateFmt = Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  /** Conversion from transaction type to it's description */
  const dictTransactionTypes: { [K in ETransactionType]: string } = {
    [ETransactionType.ERedeemCode]:
      LL.Transactions.Table.TypeDescriptions.Redeem(),
  };

  return [
    {
      tag: "value",
      label: LL.Transactions.Table.Columns.Value(),
      format: (row) => {
        return (
          <Stack alignItems="center" direction="row" gap={2}>
            {row.value > 0 ? (
              <AddCircle sx={{ color: "green" }} />
            ) : (
              <RemoveCircle sx={{ color: "red" }} />
            )}
            <Typography sx={{ color: row.value > 0 ? "green" : "red" }}>
              {currencyFmt.format(row.value)}
            </Typography>
          </Stack>
        );
      },
    },
    {
      tag: "description",
      label: LL.Transactions.Table.Columns.Description(),
      format: (row) => {
        return dictTransactionTypes[row.description];
      },
    },
    {
      tag: "date",
      label: LL.Transactions.Table.Columns.Date(),
      format: (row) => {
        return dateFmt.format(row.date);
      },
    },
  ];
};

/** Props passed to the row component */
interface ITransactionRowProps {
  columns: ITransactionColumns[];
  row?: ITransactionRow;
}

/** Element for one row of the table */
const TransactionRow = (props: ITransactionRowProps) => {
  /** If the row is undefined show the skeleton */
  if (props.row === undefined) {
    return (
      <TableRow>
        <TableCell colSpan={props.columns.length}>
          <Skeleton />
        </TableCell>
      </TableRow>
    );
  }

  /** Show the actual row data */
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

/** Table listing and detailing the user's transactions */
export const TransactionsTable = () => {
  /** Use localication */
  const { locale, LL } = useI18nContext();

  /** Use authentication */
  const token = useAuthContext();

  /** Create table columns from the localization */
  const columns = useMemo(() => {
    return createColumns(locale, LL);
  }, [locale, LL]);

  /** Pagination control */
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

  /** Data collection */
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState<(ITransactionRow | undefined)[]>([
    undefined,
  ]);

  useEffect(() => {
    // Replace all rows for skeletons during the data fetch
    setRows(Array.from(Array(rowsPerPage)));

    // Fetch the data
    TransactionRequest(
      token!,
      {
        limit: rowsPerPage,
        skip: page * rowsPerPage,
      },
      (resp) => {
        // Handle the received data
        setRows(
          resp?.items.map((respItem) => {
            return {
              _id: respItem._id,
              value: respItem.amount,
              date: respItem.time,
              description: respItem.type,
            };
          }) || []
        );
        setTotalRows(resp?.count || 0);
      }
    );
  }, [token, page, rowsPerPage]);

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="sticky table">
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
            {rows.map((row) => {
              return <TransactionRow row={row} columns={columns} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
