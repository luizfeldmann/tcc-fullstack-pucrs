"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useI18nContext } from "../../localization/i18n-react";
import {
  SignupFormSubmitPartialState,
  SignupResult,
  useSignupForm,
} from "./useSignupForm";
import { Captcha } from "../Captcha/Captcha";

/** Form collecting data for a new user account */
export const SignupForm = () => {
  const { LL } = useI18nContext();

  const {
    control,
    errors,
    disableSubmit,
    onCaptcha,
    onSubmitHandler,
    submitState,
  } = useSignupForm();

  if (submitState === SignupResult.Created) {
    // After the creation is successful, the form disappears and we show a confirmation message
    return <Alert severity="success">{LL.Signup.Status.Sent()}</Alert>;
  }

  /** When the request is loading, shows a circular progress; or else shows the Submit text */
  const submitButtonContent =
    submitState === SignupFormSubmitPartialState.Loading ? (
      <CircularProgress />
    ) : (
      <>{LL.Signup.Form.ButtonSubmit()}</>
    );

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              label={LL.Signup.Form.FirstName()}
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
              label={LL.Signup.Form.LastName()}
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
              label={LL.Signup.Form.Email()}
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
              label={LL.Signup.Form.Password()}
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
              label={LL.Signup.Form.PasswordConfirmation()}
              type="password"
              helperText={errors.confirmPassword?.message}
              error={errors.confirmPassword !== undefined}
              {...field}
            />
          )}
        />
        <Captcha onChange={onCaptcha} />
        <Button
          variant="contained"
          type="submit"
          startIcon={<PersonAdd />}
          disabled={disableSubmit}
        >
          {submitButtonContent}
        </Button>
        {submitState === SignupResult.InternalError && (
          <span>{LL.Signup.Status.UnknownError()}</span>
        )}
      </Stack>
    </form>
  );
};
