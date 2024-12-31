import { BalanceCard } from "@/lib/components/BalanceCard/BalanceCard";
import { TransactionsTable } from "@/lib/components/TransactionsTable/TransactionsTable";
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
    title: LL.Transactions.Title(),
  };
}

/**
 * Page showing a detailed statement of all transactions
 */
export default function TransactionStatement() {
  const { LL } = useServerLocalization();

  return (
    <Stack spacing={1}>
      <h1>{LL.Transactions.Title()}</h1>
      <BalanceCard enableDepositLink />
      <TransactionsTable />
    </Stack>
  );
}
