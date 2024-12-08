"use client";

import { ForgotPasswordForm } from "@/lib/components/ForgotPasswordForm/ForgotPasswordForm";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Stack } from "@mui/material";

/** Page for the user who forgot the password to request a reset */
const ForgotPassword = () => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.ForgotPassword.Title()}</h1>
      <ForgotPasswordForm />
    </Stack>
  );
};

export default ForgotPassword;
