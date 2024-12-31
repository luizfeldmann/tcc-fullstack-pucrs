"use client";

import { ChangePasswordForm } from "@/lib/components/ChangePasswordForm/ChangePasswordForm";
import { FormPage } from "@/lib/components/FormPage/FormPage";
import { useI18nContext } from "@/lib/localization/i18n-react";

/** Page for the user to insert a new password after clicking the confirmation mail */
const ChangePassword = () => {
  const { LL } = useI18nContext();

  return (
    <FormPage>
      <h1>{LL.ChangePassword.Title()}</h1>
      <ChangePasswordForm />
    </FormPage>
  );
};

export default ChangePassword;
