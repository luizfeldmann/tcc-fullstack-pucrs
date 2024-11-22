import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import BalanceCard from "../../components/BalanceCard/BalanceCard.tsx";
import { useBalanceQuery } from "../../components/BalanceCard/BalanceQuery.ts";

/** Parameters passed to the component */
export interface ITransactionStatementPageParams {
  token: string;
}

/**
 * Page showing a detailed statement of all transaction
 */
const TransactionStatement = (params: ITransactionStatementPageParams) => {
  const { LL } = useI18nContext();

  // Query the balance
  const { data: balance } = useBalanceQuery(params.token);

  return (
    <Stack>
      <h1>{LL.Transactions.Title()}</h1>
      <BalanceCard enableDepositLink balance={balance} />
    </Stack>
  );
};

export default TransactionStatement;
