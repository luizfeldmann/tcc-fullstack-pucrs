import { Navigate, useLocation } from "react-router-dom";
import { ERoutes } from "../routes";

/** The query keyword for the redirect */
export const loginRedirectQuery = "redirect";

/** Redirects to the login page with a hint to return to the local page */
const LoginRedirect = () => {
  const location = useLocation();
  return (
    <Navigate
      to={`${ERoutes.Login}?${loginRedirectQuery}=${location.pathname}`}
      replace
    />
  );
};

export default LoginRedirect;
