"use client";

import StoresList from "@/lib/components/StoresList/StoresList";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Stack } from "@mui/material";

/**
 * Page where the user may find selling locations
 */
export default function StoresPage() {
  const { LL } = useI18nContext();

  return (
    <Stack spacing={1}>
      <h1>{LL.Stores.Title()}</h1>
      <StoresList />
    </Stack>
  );
}
