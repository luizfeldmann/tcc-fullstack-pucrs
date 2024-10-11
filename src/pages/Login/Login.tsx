import { Button, Link, Stack, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validate as validateEmail } from "email-validator";
import { FormEvent, useState } from "react";

// This implementation is intentionally 'low-level' to explore the involved concepts

const Login = () => {
  class CLoginFormState {
    showPassword: boolean = false;
    emailError?: string;
    passwordError?: string;
  }

  const [state, setState] = useState<CLoginFormState>(new CLoginFormState());

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleOnSubmit = (formEvent: FormEvent) => {
    formEvent.preventDefault();

    // Read form values
    const target = formEvent.target as typeof formEvent.target & {
      email: { value: string };
      password: { value: string };
    };

    // Validation
    let passErr: string | undefined = undefined;
    let mailErr: string | undefined = undefined;

    const mailValue = target.email.value;
    const passValue = target.password.value;

    if (!mailValue) mailErr = "Address is required";
    else if (!validateEmail(mailValue))
      mailErr = "The e-mail address is invalid";

    if (!passValue) passErr = "Password is required";

    setState((prevState) => ({
      ...prevState,
      emailError: mailErr,
      passwordError: passErr,
    }));

    // Do Submit
    // TODO
  };

  const getError = (message?: string) => {
    return {
      error: Boolean(message),
      helperText: message,
    };
  };

  return (
    <Stack>
      <h1>Log-in</h1>
      <form onSubmit={handleOnSubmit}>
        <Stack spacing={{ xs: 1, sm: 2 }}>
          <TextField
            name="email"
            label="E-Mail"
            {...getError(state.emailError)}
          />
          <TextField
            name="password"
            label="Password"
            {...getError(state.passwordError)}
            type={state.showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
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
      <center>
        <Link href="/reset-password">Reset Password</Link>
      </center>
    </Stack>
  );
};

export default Login;
