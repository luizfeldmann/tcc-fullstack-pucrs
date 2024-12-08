"use client";

import { useAuthContext } from "@/lib/components/Providers/AuthProvider";
import { ERoutes } from "@/lib/constants/ERoutes";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Alert, LinearProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const { LL } = useI18nContext();
  const authContext = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    authContext?.doLogout();
    router.push(ERoutes.Index);
  }, [router, authContext]);

  return (
    <Stack spacing={1}>
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
