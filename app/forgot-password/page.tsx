"use client";

import { ForgotPasswordForm } from "@/lib/components/ForgotPasswordForm/ForgotPasswordForm";
import { FormPage } from "@/lib/components/FormPage/FormPage";
import { useI18nContext } from "@/lib/localization/i18n-react";

/** Page for the user who forgot the password to request a reset */
const ForgotPassword = () => {
  const { LL } = useI18nContext();

  return (
    <FormPage>
      <h1>{LL.ForgotPassword.Title()}</h1>
      <ForgotPasswordForm />
    </FormPage>
  );
};

export default ForgotPassword;
