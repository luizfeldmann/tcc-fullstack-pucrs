import { BalanceCard } from "@/lib/components/BalanceCard/BalanceCard";
import { MethodsOfPaymentList } from "@/lib/components/MethodsOfPaymentList/MethodsOfPaymentList";
import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { Stack } from "@mui/material";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Deposit.Title(),
  };
}

/**
 * Page where the user may add more balance to the account
 */
export default function MakeDepositPage() {
  const { LL } = useServerLocalization();

  return (
    <Stack spacing={1}>
      <h1>{LL.Deposit.Title()}</h1>
      <BalanceCard enableDepositLink={false} />
      <MethodsOfPaymentList />
    </Stack>
  );
}
