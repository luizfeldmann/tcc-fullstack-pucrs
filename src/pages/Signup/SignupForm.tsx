import { Button, Stack, TextField } from "@mui/material";
import { useSignupForm } from "./useSignupForm";
import { Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

export const SignupForm = () => {
  const { control, errors, disableSubmit, onCaptcha, onSubmitHandler } =
    useSignupForm();

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              label="First Name"
              helperText={errors.firstName?.message}
              error={errors.firstName !== undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              label="Last Name"
              helperText={errors.lastName?.message}
              error={errors.lastName !== undefined}
              {...field}
            />
          )}
        />
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
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="Password"
              type="password"
              helperText={errors.password?.message}
              error={errors.password !== undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              label="Confirm Password"
              type="password"
              helperText={errors.confirmPassword?.message}
              error={errors.confirmPassword !== undefined}
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
