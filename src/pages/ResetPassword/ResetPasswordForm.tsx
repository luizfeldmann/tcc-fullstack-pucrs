import { Button, Stack, TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { usePasswordResetForm } from "./usePasswordResetForm";
import { Controller } from "react-hook-form";

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
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_CLIENT_KEY}
          onChange={onCaptcha}
        />
        <Button variant="contained" type="submit" disabled={disableSubmit}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
