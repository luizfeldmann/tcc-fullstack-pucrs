import { UpdateAccountTabs } from "@/lib/components/UpdateAccountTabs/UpdateAccountTabs";
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
    title: LL.Account.Title(),
  };
}

/**
 * Page where the user consults or changes account information
 */
export default function AccountPage() {
  // Localization
  const { LL } = useServerLocalization();

  return (
    <Stack spacing={1}>
      <h1>{LL.Account.Title()}</h1>
      <UpdateAccountTabs />
    </Stack>
  );
}
