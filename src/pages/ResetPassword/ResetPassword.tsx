import { Stack } from "@mui/material";
import { ResetPasswordForm } from "./ResetPasswordForm";

/** Page for the user who forgot the password to request a reset */
const ResetPassword = () => {
  return (
    <Stack>
      <h1>Reset Password</h1>
      <ResetPasswordForm />
    </Stack>
  );
};

export default ResetPassword;
