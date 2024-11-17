import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import {
  EChangePasswordFormIntermediate,
  useChangePasswordForm,
} from "./useChangePasswordForm";
import { Controller } from "react-hook-form";
import { EChangePasswordResult } from "./ChangePasswordRequest";
import { Check, LockReset } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ERoutes } from "../../routes";
import { useI18nContext } from "../../localization/i18n-react";

/** Parameters passed to the verification state component */
export interface IChangePasswordFormParams {
  /** JWT token used for the verification */
  token: string;
}

const ChangePasswordForm = (params: IChangePasswordFormParams) => {
  // Localization for the form
  const { LL } = useI18nContext();

  // Logic for the form
  const { control, errors, disableSubmit, state, onSubmitHandler } =
    useChangePasswordForm(params.token);

  // Form is replaced by message if success
  if (state === EChangePasswordResult.OK) {
    return (
      <Stack>
        <div>
          <Check />
          <span>{LL.ChangePassword.SuccessMessage()}</span>
        </div>
        <Button variant="contained" component={Link} to={ERoutes.Login}>
          {LL.ChangePassword.ContinueLoginButton()}
        </Button>
      </Stack>
    );
  }

  // Show the actual form
  return (
    <form onSubmit={onSubmitHandler}>
      <Stack>
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
        <Button
          variant="contained"
          type="submit"
          startIcon={<LockReset />}
          disabled={disableSubmit}
        >
          {state === EChangePasswordFormIntermediate.Loading ? (
            <CircularProgress />
          ) : (
            <span>{LL.ChangePassword.Form.Submit()}</span>
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
