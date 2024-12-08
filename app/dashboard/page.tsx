"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { Stack } from "@mui/material";

/**
 * Logged-in area main landing page
 */
export default function DashboardPage() {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.Main.Title()}</h1>
    </Stack>
  );
}
