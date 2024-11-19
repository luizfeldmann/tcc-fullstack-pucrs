import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import BalanceCard from "../../components/BalanceCard";

/** Parameters passed to the component */
export interface ITransactionStatementPageParams {
  token: string;
}

/**
 * Page showing a detailed statement of all transaction
 */
const TransactionStatement = (params: ITransactionStatementPageParams) => {
  const { LL } = useI18nContext();

  // TODO: implement queries
  const balance = 0;

  return (
    <Stack>
      <h1>{LL.Transactions.Title()}</h1>
      <BalanceCard enableDepositLink balance={balance} />
    </Stack>
  );
};

export default TransactionStatement;
