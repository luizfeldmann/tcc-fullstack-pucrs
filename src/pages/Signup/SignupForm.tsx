import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useSignupForm, SignupFormSubmitPartialState } from "./useSignupForm";
import { RECAPTCHA_CLIENT_KEY } from "../../constants";
import { Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { SignupResult } from "./SignupRequest";
import { DoneSharp } from "@mui/icons-material";

/** Form collecting data for a new user account */
export const SignupForm = () => {
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
    return (
      <div>
        <DoneSharp />
        <span>Check your inbox for the confirmation link.</span>
      </div>
    );
  } else {
    /** When the request is loading, shows a circular progress; or else shows the Submit text */
    const submitButtonContent =
      submitState === SignupFormSubmitPartialState.Loading ? (
        <CircularProgress />
      ) : (
        <>Submit</>
      );

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
          <ReCAPTCHA sitekey={RECAPTCHA_CLIENT_KEY} onChange={onCaptcha} />
          <Button variant="contained" type="submit" disabled={disableSubmit}>
            {submitButtonContent}
          </Button>
          {submitState === SignupResult.InternalError && (
            <span>An unknown error has ocurred</span>
          )}
        </Stack>
      </form>
    );
  }
};
