import LoginRedirect from "../../components/LoginRedirect";

/** Parameters passed to the component */
export interface ITransactionStatementPageParams {
  token?: string;
}

/**
 * Page showing a detailed statement of all transaction
 */
const TransactionStatement = (params: ITransactionStatementPageParams) => {
  // Ensure the user is logged-in when accessing this page
  if (!params.token) return <LoginRedirect />;

  return <h1>Your Transactions</h1>;
};

export default TransactionStatement;
