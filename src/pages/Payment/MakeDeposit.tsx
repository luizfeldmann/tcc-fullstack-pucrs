import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import { MethodsOfPaymentList } from "./MethodsOfPaymentList";
import { useBalanceQuery } from "../../components/BalanceCard/BalanceQuery";
import { useAuthContext } from "../../hooks/useAuth";

/**
 * Page where the user may add more balance to the account
 */
const MakeDeposit = () => {
  const { LL } = useI18nContext();

  // Get authenticated user
  const token = useAuthContext();

  // Query the balance
  const { data: balance } = useBalanceQuery(token!);

  return (
    <Stack spacing={1}>
      <h1>{LL.Deposit.Title()}</h1>
      <BalanceCard enableDepositLink={false} balance={balance} />
      <MethodsOfPaymentList />
    </Stack>
  );
};

export default MakeDeposit;
