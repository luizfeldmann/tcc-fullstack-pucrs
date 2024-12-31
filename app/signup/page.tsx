"use client";

import { SignupForm } from "../../lib/components/SignupForm/SignupForm";
import { useI18nContext } from "../../lib/localization/i18n-react";
import { FormPage } from "@/lib/components/FormPage/FormPage";

/** Page where the user may create a new account */
const Signup = () => {
  const { LL } = useI18nContext();

  return (
    <FormPage>
      <h1>{LL.Signup.Title()}</h1>
      <SignupForm />
    </FormPage>
  );
};

export default Signup;
