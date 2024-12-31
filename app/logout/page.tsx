import { LogoutPerformer } from "@/lib/components/Effects/LogoutPerformer";
import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { Alert, LinearProgress, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Logout.Title(),
  };
}

/**
 * Progress while the user is logged-off
 */
export default function LogoutPage() {
  const { LL } = useServerLocalization();

  return (
    <Stack spacing={1}>
      <LogoutPerformer />
      <Typography variant="h2">{LL.Logout.Title()}</Typography>
      <Alert severity="info">
        <Stack spacing={1}>
          <Typography>{LL.Logout.Progress()}</Typography>
          <LinearProgress />
        </Stack>
      </Alert>
    </Stack>
  );
}
