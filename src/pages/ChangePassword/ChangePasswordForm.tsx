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

/** Parameters passed to the verification state component */
export interface IChangePasswordFormParams {
  /** JWT token used for the verification */
  token: string;
}

const ChangePasswordForm = (params: IChangePasswordFormParams) => {
  const { control, errors, disableSubmit, state, onSubmitHandler } =
    useChangePasswordForm(params.token);

  // Form is replaced by message if success
  if (state === EChangePasswordResult.OK) {
    return (
      <Stack>
        <div>
          <Check />
          <span>Password changed successfully.</span>
        </div>
        <Button variant="contained" component={Link} to={ERoutes.Login}>
          Log-in
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
        <Button
          variant="contained"
          type="submit"
          startIcon={<LockReset />}
          disabled={disableSubmit}
        >
          {state === EChangePasswordFormIntermediate.Loading ? (
            <CircularProgress />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
