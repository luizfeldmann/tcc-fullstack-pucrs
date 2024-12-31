import StoresList from "@/lib/components/StoresList/StoresList";
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
    title: LL.Stores.Title(),
  };
}

/**
 * Page where the user may find selling locations
 */
export default function StoresPage() {
  const { LL } = useServerLocalization();

  return (
    <Stack spacing={1}>
      <h1>{LL.Stores.Title()}</h1>
      <StoresList />
    </Stack>
  );
}
