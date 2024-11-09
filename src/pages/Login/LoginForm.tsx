import { Button, Stack, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginForm } from "./useLoginForm";

/**
 * Log-in form with email/password input fields
 */
export const LoginForm = () => {
  const loginForm = useLoginForm();

  return (
    <form onSubmit={loginForm.handleOnSubmit}>
      <Stack spacing={{ xs: 1, sm: 2 }}>
        <TextField
          name="email"
          label="E-Mail"
          {...loginForm.getErrorAttributtes(loginForm.state.emailError)}
        />
        <TextField
          name="password"
          label="Password"
          {...loginForm.getErrorAttributtes(loginForm.state.passwordError)}
          type={loginForm.state.showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={loginForm.handleClickShowPassword}>
                  {loginForm.state.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              ),
            },
          }}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};
