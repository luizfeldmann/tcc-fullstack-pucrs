import { Stack } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm";
import { useParams } from "react-router-dom";
import { useI18nContext } from "../../localization/i18n-react";

/** Page for the user to insert a new password after clicking the confirmation mail */
const ChangePassword = () => {
  const { LL } = useI18nContext();

  /** The URL placeholder contains the token used to change the password */
  const { token } = useParams();

  return (
    <Stack>
      <h1>{LL.ChangePassword.Title()}</h1>
      <ChangePasswordForm token={token || ""} />
    </Stack>
  );
};

export default ChangePassword;
