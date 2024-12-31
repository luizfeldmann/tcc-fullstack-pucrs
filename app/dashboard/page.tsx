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
    title: LL.Main.Title(),
  };
}

/**
 * Logged-in area main landing page
 */
export default function DashboardPage() {
  const { LL } = useServerLocalization();

  return (
    <Stack spacing={1}>
      <h1>{LL.Main.Title()}</h1>
    </Stack>
  );
}
