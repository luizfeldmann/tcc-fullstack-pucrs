"use client";

import { ChangePasswordForm } from "@/lib/components/ChangePasswordForm/ChangePasswordForm";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Stack } from "@mui/material";

/** Page for the user to insert a new password after clicking the confirmation mail */
const ChangePassword = () => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.ChangePassword.Title()}</h1>
      <ChangePasswordForm />
    </Stack>
  );
};

export default ChangePassword;
