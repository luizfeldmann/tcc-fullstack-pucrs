import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import BalanceCard from "../../components/BalanceCard/BalanceCard.tsx";
import { useBalanceQuery } from "../../components/BalanceCard/BalanceQuery.ts";
import { useAuthContext } from "../../hooks/useAuth.ts";

/**
 * Page showing a detailed statement of all transaction
 */
const TransactionStatement = () => {
  const { LL } = useI18nContext();

  // Get login info
  const token = useAuthContext();

  // Query the balance
  const { data: balance } = useBalanceQuery(token!);

  return (
    <Stack>
      <h1>{LL.Transactions.Title()}</h1>
      <BalanceCard enableDepositLink balance={balance} />
    </Stack>
  );
};

export default TransactionStatement;
