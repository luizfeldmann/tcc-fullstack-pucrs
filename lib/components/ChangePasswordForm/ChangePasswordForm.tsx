"use client";

import { ERoutes } from "@/lib/constants/ERoutes";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { LockReset } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import {
  EChangePasswordStatus,
  useChangePasswordForm,
} from "./useChangePasswordForm";
import { useSearchParams } from "next/navigation";

export const ChangePasswordForm = () => {
  // Localization for the form
  const { LL } = useI18nContext();

  // Get the token from the URL
  const query = useSearchParams();
  const token = query.get("t") ?? "";

  // Logic for the form
  const form = useChangePasswordForm(token);

  // Check the query was passed
  if (!query)
    return <Alert severity="error">{LL.ChangePassword.Status.Invalid()}</Alert>;

  // Form is replaced by a status message
  if (
    form.status === EChangePasswordStatus.Unauthorized ||
    form.status === EChangePasswordStatus.InternalError
  ) {
    return <Alert severity="error">{LL.ChangePassword.Status.Invalid()}</Alert>;
  } else if (form.status === EChangePasswordStatus.OK) {
    return (
      <Stack>
        <Alert severity="success">{LL.ChangePassword.Status.Success()}</Alert>
        <Button variant="contained" href={ERoutes.Login}>
          {LL.ChangePassword.ContinueLoginButton()}
        </Button>
      </Stack>
    );
  }

  // Show the actual form
  return (
    <form onSubmit={form.onSubmitHandler}>
      <Stack spacing={1}>
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <TextField
              label={LL.ChangePassword.Form.Password()}
              type="password"
              helperText={form.errors.password?.message}
              error={form.errors.password !== undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <TextField
              label={LL.ChangePassword.Form.ConfirmPassword()}
              type="password"
              helperText={form.errors.confirmPassword?.message}
              error={form.errors.confirmPassword !== undefined}
              {...field}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          startIcon={form.loading ? <CircularProgress /> : <LockReset />}
          disabled={form.disableSubmit}
        >
          {LL.ChangePassword.Form.Submit()}
        </Button>
      </Stack>
    </form>
  );
};
