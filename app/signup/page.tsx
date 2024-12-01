"use client";

import { Stack } from "@mui/material";
import { SignupForm } from "../../lib/components/SignupForm/SignupForm";
import { useI18nContext } from "../../lib/localization/i18n-react";

/** Page where the user may create a new account */
const Signup = () => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.Signup.Title()}</h1>
      <SignupForm />
    </Stack>
  );
};

export default Signup;
