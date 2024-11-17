import LoginRedirect from "../../components/LoginRedirect";
import { useI18nContext } from "../../localization/i18n-react";

/** Parameters passed to the component */
export interface IMakeDepositPageParams {
  token?: string;
}

/**
 * Page where the user may add more balance to the account
 */
const MakeDeposit = (params: IMakeDepositPageParams) => {
  const { LL } = useI18nContext();

  // Ensure the user is logged-in when accessing this page
  if (!params.token) return <LoginRedirect />;

  return <h1>{LL.Deposit.Title()}</h1>;
};

export default MakeDeposit;
