import { Stack } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm";
import { useParams } from "react-router-dom";

/** Page for the user to insert a new password after clicking the confirmation mail */
const ChangePassword = () => {
  const { token } = useParams();

  return (
    <Stack>
      <h1>Change your Password</h1>
      <ChangePasswordForm token={token || ""} />
    </Stack>
  );
};

export default ChangePassword;
