import { ReactNode } from "react";
import { Locales, TranslationFunctions } from "@/lib/localization/i18n-types";
import { ETransactionType } from "@/lib/schemas/dto/ETransactionType";
import { Stack, Typography } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { ITransactionResponseItemData } from "@/lib/schemas/dto/TransactionsRequestResponse";

/** Describes each column */
export interface ITransactionColumns {
  tag: keyof ITransactionResponseItemData;
  label: string;
  minWidth?: number;
  format: (row: ITransactionResponseItemData) => ReactNode;
}

/** Creates the collection of columns from the translation */
export const createColumns = (
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
      tag: "amount",
      label: LL.Transactions.Table.Columns.Value(),
      format: (row) => {
        return (
          <Stack alignItems="center" direction="row" gap={2}>
            {row.amount > 0 ? (
              <AddCircle sx={{ color: "green" }} />
            ) : (
              <RemoveCircle sx={{ color: "red" }} />
            )}
            <Typography sx={{ color: row.amount > 0 ? "green" : "red" }}>
              {currencyFmt.format(row.amount)}
            </Typography>
          </Stack>
        );
      },
    },
    {
      tag: "type",
      label: LL.Transactions.Table.Columns.Description(),
      format: (row) => {
        return dictTransactionTypes[row.type];
      },
    },
    {
      tag: "time",
      label: LL.Transactions.Table.Columns.Date(),
      format: (row) => {
        return dateFmt.format(row.time);
      },
    },
  ];
};
