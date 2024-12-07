"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { loginRedirectQuery } from "./LoginRedirect";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Login } from "@mui/icons-material";
import { useLoginForm } from "./useLoginForm";
import { Controller } from "react-hook-form";
import { ILoginResponseData } from "@/lib/schemas/dto/LoginRequestResponse";
import { useRouter } from "next/navigation";
import { ERoutes } from "@/lib/constants/ERoutes";
import { useAuthContext } from "../Providers/AuthProvider";

/**
 * Log-in form with email/password input fields
 */
export const LoginForm = () => {
  const { LL } = useI18nContext();
  const authContext = useAuthContext();

  // Use the query to find the redirect destination after the login
  const searchParams = useSearchParams();
  const router = useRouter();

  // Callback when the login is succesful
  const onLogin = useCallback(
    (resp: ILoginResponseData) => {
      // Save the logged token
      authContext?.doLogin(resp.token);
      // Redirect the user somewhere
      const redirectAfterLogin =
        searchParams.get(loginRedirectQuery) ?? ERoutes.Dashboard;
      router.push(redirectAfterLogin);
    },
    [searchParams, router, authContext]
  );

  /** Form logic */
  const loginForm = useLoginForm(onLogin);

  return (
    <form onSubmit={loginForm.onSubmitHandler}>
      <Stack spacing={{ xs: 1, sm: 2 }}>
        <Controller
          name="emailAddress"
          control={loginForm.control}
          render={({ field }) => (
            <TextField
              label={LL.Login.Form.Email()}
              helperText={loginForm.errors.emailAddress?.message}
              error={loginForm.errors.emailAddress !== undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={loginForm.control}
          render={({ field }) => (
            <TextField
              label={LL.Signup.Form.Password()}
              type="password"
              helperText={loginForm.errors.password?.message}
              error={loginForm.errors.password !== undefined}
              {...field}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          startIcon={loginForm.loading ? <CircularProgress /> : <Login />}
          disabled={loginForm.disableSubmit}
        >
          {LL.Login.Form.ButtonSubmit()}
        </Button>
      </Stack>
    </form>
  );
};
