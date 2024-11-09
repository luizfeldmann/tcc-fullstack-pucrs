import { Button, Stack, TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { usePasswordResetForm } from "./usePasswordResetForm";
import { RECAPTCHA_CLIENT_KEY } from "../../constants";
import { Controller } from "react-hook-form";

/** Form component where the user will insert e-mail request for a password reset */
export const ResetPasswordForm = () => {
  const { control, errors, disableSubmit, onCaptcha, onSubmitHandler } =
    usePasswordResetForm();

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <Controller
          name="emailAddress"
          control={control}
          render={({ field }) => (
            <TextField
              label="E-Mail"
              helperText={errors.emailAddress?.message}
              error={errors.emailAddress !== undefined}
              {...field}
            />
          )}
        />
        <ReCAPTCHA sitekey={RECAPTCHA_CLIENT_KEY} onChange={onCaptcha} />
        <Button variant="contained" type="submit" disabled={disableSubmit}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
