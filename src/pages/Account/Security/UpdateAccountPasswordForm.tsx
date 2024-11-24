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
import { useUpdateAccountPasswordForm } from "./useUpdataAccountPasswordForm";
import { useI18nContext } from "../../../localization/i18n-react";

/** Allows user to edit account security settings */
const UpdateAccountPasswordForm = () => {
  // Localization for the form
  const { LL } = useI18nContext();

  // Logic for the form
  const {
    isSuccess,
    isLoading,
    disableSubmit,
    control,
    errors,
    handleSubmit,
    handleResetForm,
  } = useUpdateAccountPasswordForm();

  // When completed successfully, replace the form with a notification
  if (isSuccess)
    return (
      <Alert severity="success" onClose={handleResetForm}>
        {LL.ChangePassword.SuccessMessage()}
      </Alert>
    );

  // Show the actual form
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1}>
        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <TextField
              label={LL.Account.SecurityTab.UpdatePasswordForm.OldPassword()}
              type="password"
              helperText={errors.oldPassword?.message}
              error={errors.oldPassword !== undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label={LL.ChangePassword.Form.Password()}
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
              label={LL.ChangePassword.Form.ConfirmPassword()}
              type="password"
              helperText={errors.confirmPassword?.message}
              error={errors.confirmPassword !== undefined}
              {...field}
            />
          )}
        />
        <Typography align="center">
          <Button
            variant="contained"
            type="submit"
            startIcon={isLoading ? <CircularProgress /> : <LockReset />}
            disabled={disableSubmit}
          >
            {!isLoading && LL.ChangePassword.Form.Submit()}
          </Button>
        </Typography>
      </Stack>
    </form>
  );
};

export default UpdateAccountPasswordForm;
