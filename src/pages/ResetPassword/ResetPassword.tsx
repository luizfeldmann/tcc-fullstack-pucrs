import { Stack } from "@mui/material";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { useI18nContext } from "../../localization/i18n-react";

/** Page for the user who forgot the password to request a reset */
const ResetPassword = () => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.ResetPassword.Title()}</h1>
      <ResetPasswordForm />
    </Stack>
  );
};

export default ResetPassword;
