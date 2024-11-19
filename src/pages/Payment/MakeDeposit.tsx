import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import BalanceCard from "../../components/BalanceCard";
import { MethodsOfPaymentList } from "./MethodsOfPaymentList";

/** Parameters passed to the component */
export interface IMakeDepositPageParams {
  token: string;
}

/**
 * Page where the user may add more balance to the account
 */
const MakeDeposit = (params: IMakeDepositPageParams) => {
  const { LL } = useI18nContext();

  // TODO: implement queries
  const balance = 0;

  return (
    <Stack spacing={1}>
      <h1>{LL.Deposit.Title()}</h1>
      <BalanceCard enableDepositLink={false} balance={balance} />
      <MethodsOfPaymentList token={params.token} />
    </Stack>
  );
};

export default MakeDeposit;
