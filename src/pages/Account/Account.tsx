import { Stack } from "@mui/material";
import LoginRedirect from "../../components/LoginRedirect";

/** Parameters passed to the account page */
export interface IAccountPageParams {
  /** The authentication token when logged in */
  token?: string;
}

/**
 * Page where the user consults or changes account information
 */
const Account = (params: IAccountPageParams) => {
  // Ensure the user is logged-in when accessing this page
  if (!params.token) return <LoginRedirect />;

  return (
    <Stack>
      <h1>Your Account</h1>
    </Stack>
  );
};

export default Account;
