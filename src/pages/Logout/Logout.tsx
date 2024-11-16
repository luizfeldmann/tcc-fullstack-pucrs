import { Navigate } from "react-router-dom";
import { ERoutes } from "../../routes";

export interface ILogoutPageParams {
  /** The callback invoked then page is accessed */
  onLogout: () => void;
}

/**
 * Helper page used to logout the user and redirect to the index
 */
const Logout = (params: ILogoutPageParams) => {
  // Perform the logout logic
  params.onLogout();

  // Redirects to home
  return <Navigate to={ERoutes.Index} />;
};

export default Logout;
