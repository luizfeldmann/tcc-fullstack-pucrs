"use client";

import { LockReset } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useUpdateAccountPasswordForm } from "./useUpdateAccountPasswordForm";
import { useI18nContext } from "@/lib/localization/i18n-react";

/** Allows user to edit account security settings */
export const UpdateAccountPasswordForm = () => {
  // Localization for the form validation warnings
  const { LL } = useI18nContext();

  // Form logic
  const form = useUpdateAccountPasswordForm();

  // When completed successfully, replace the form with a notification
  if (form.isSuccess)
    return (
      <Alert severity="success" onClose={form.handleResetForm}>
        {LL.ChangePassword.Status.Success()}
      </Alert>
    );

  // Show the actual form
  return (
    <form onSubmit={form.handleSubmit}>
      <Stack spacing={1}>
        <Controller
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <TextField
              label={LL.Account.SecurityTab.UpdatePasswordForm.OldPassword()}
              disabled={form.isLoading}
              type="password"
              helperText={form.errors.oldPassword?.message}
              error={form.errors.oldPassword !== undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <TextField
              label={LL.ChangePassword.Form.Password()}
              disabled={form.isLoading}
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
              disabled={form.isLoading}
              type="password"
              helperText={form.errors.confirmPassword?.message}
              error={form.errors.confirmPassword !== undefined}
              {...field}
            />
          )}
        />
        <Typography align="center">
          <Button
            variant="contained"
            type="submit"
            startIcon={form.isLoading ? <CircularProgress /> : <LockReset />}
            disabled={form.disableSubmit}
          >
            {LL.ChangePassword.Form.Submit()}
          </Button>
        </Typography>
      </Stack>
    </form>
  );
};
