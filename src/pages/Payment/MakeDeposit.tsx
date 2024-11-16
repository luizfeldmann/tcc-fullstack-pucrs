import LoginRedirect from "../../components/LoginRedirect";

/** Parameters passed to the component */
export interface IMakeDepositPageParams {
  token?: string;
}

/**
 * Page where the user may add more balance to the account
 */
const MakeDeposit = (params: IMakeDepositPageParams) => {
  // Ensure the user is logged-in when accessing this page
  if (!params.token) return <LoginRedirect />;

  return <h1>Add money to your balance</h1>;
};

export default MakeDeposit;
