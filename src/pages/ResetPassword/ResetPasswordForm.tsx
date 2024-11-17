import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import {
  usePasswordResetForm,
  EPasswordResetFormStages,
} from "./usePasswordResetForm";
import { RECAPTCHA_CLIENT_KEY } from "../../constants";
import { Controller } from "react-hook-form";
import { EResetPasswordResult } from "./ResetPasswordRequest";
import { Check, Send } from "@mui/icons-material";
import { useI18nContext } from "../../localization/i18n-react";

/** Form component where the user will insert e-mail request for a password reset */
export const ResetPasswordForm = () => {
  const { LL } = useI18nContext();

  const { control, errors, disableSubmit, state, onCaptcha, onSubmitHandler } =
    usePasswordResetForm();

  /** When successfull, the form changes to a confirmation message */
  if (state === EResetPasswordResult.OK) {
    return (
      <div>
        <Check />
        <span>{LL.ResetPassword.Status.Sent()}</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <Controller
          name="emailAddress"
          control={control}
          render={({ field }) => (
            <TextField
              label={LL.ResetPassword.Form.Email()}
              helperText={errors.emailAddress?.message}
              error={errors.emailAddress !== undefined}
              {...field}
            />
          )}
        />
        <ReCAPTCHA sitekey={RECAPTCHA_CLIENT_KEY} onChange={onCaptcha} />
        <Button
          variant="contained"
          type="submit"
          startIcon={<Send />}
          disabled={disableSubmit}
        >
          {state === EPasswordResetFormStages.loading ? (
            <CircularProgress />
          ) : (
            <>{LL.ResetPassword.Form.ButtonSubmit()}</>
          )}
        </Button>
      </Stack>
    </form>
  );
};
