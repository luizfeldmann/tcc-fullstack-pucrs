import LoginRedirect from "../../components/LoginRedirect";
import { useI18nContext } from "../../localization/i18n-react";

/** Parameters passed to the component */
export interface ITransactionStatementPageParams {
  token?: string;
}

/**
 * Page showing a detailed statement of all transaction
 */
const TransactionStatement = (params: ITransactionStatementPageParams) => {
  const { LL } = useI18nContext();

  // Ensure the user is logged-in when accessing this page
  if (!params.token) return <LoginRedirect />;

  return <h1>{LL.Transactions.Title()}</h1>;
};

export default TransactionStatement;
