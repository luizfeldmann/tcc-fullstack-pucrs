"use client";

import { BalanceCard } from "@/lib/components/BalanceCard/BalanceCard";
import { TransactionsTable } from "@/lib/components/TransactionsTable/TransactionsTable";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Stack } from "@mui/material";

/**
 * Page showing a detailed statement of all transaction
 */
export default function TransactionStatement() {
  const { LL } = useI18nContext();

  return (
    <Stack spacing={1}>
      <h1>{LL.Transactions.Title()}</h1>
      <BalanceCard enableDepositLink />
      <TransactionsTable />
    </Stack>
  );
}
