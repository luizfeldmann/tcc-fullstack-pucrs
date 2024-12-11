"use client";

import { BalanceCard } from "@/lib/components/BalanceCard/BalanceCard";
import { MethodsOfPaymentList } from "@/lib/components/MethodsOfPaymentList/MethodsOfPaymentList";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Stack } from "@mui/material";

/**
 * Page where the user may add more balance to the account
 */
export default function MakeDepositPage() {
  const { LL } = useI18nContext();

  return (
    <Stack spacing={1}>
      <h1>{LL.Deposit.Title()}</h1>
      <BalanceCard enableDepositLink={false} />
      <MethodsOfPaymentList />
    </Stack>
  );
}
