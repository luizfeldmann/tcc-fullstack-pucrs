"use client";

import { VerifyAccountIndicator } from "@/lib/components/VerifyAccountIndicator/VerifyAccountIndicator";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Stack } from "@mui/material";

/** New account verification page accessed from the verification link */
const Verify = () => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.Verify.Title()}</h1>
      <VerifyAccountIndicator />
    </Stack>
  );
};

export default Verify;
