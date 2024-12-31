import { useI18nContext } from "@/lib/localization/i18n-react";
import { Send } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useForgotPasswordForm } from "./useForgotPasswordForm";
import { Captcha } from "../Captcha/Captcha";

/** Form component where the user will insert e-mail request for a password reset */
export const ForgotPasswordForm = () => {
  // Localization
  const { LL } = useI18nContext();

  // Form logic
  const form = useForgotPasswordForm();

  /** When successfull, the form changes to a confirmation message */
  if (form.success) {
    return <Alert severity="success">{LL.ForgotPassword.Status.Sent()}</Alert>;
  }

  return (
    <form onSubmit={form.onSubmitHandler}>
      <Stack spacing={1}>
        <Controller
          name="emailAddress"
          control={form.control}
          render={({ field }) => (
            <TextField
              label={LL.ForgotPassword.Form.Email()}
              helperText={form.errors.emailAddress?.message}
              error={form.errors.emailAddress !== undefined}
              {...field}
            />
          )}
        />
        <Captcha onChange={form.setCaptcha} />
        <Button
          variant="contained"
          type="submit"
          startIcon={form.loading ? <CircularProgress /> : <Send />}
          disabled={form.disableSubmit}
        >
          {LL.ForgotPassword.Form.ButtonSubmit()}
        </Button>
      </Stack>
    </form>
  );
};
