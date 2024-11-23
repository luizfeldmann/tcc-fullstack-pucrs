import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ERoutes } from "../routes";
import { useAuthContext } from "../hooks/useAuth";

/** The query keyword for the redirect */
export const loginRedirectQuery = "redirect";

/** Redirects to the login page with a hint to return to the local page */
export const LoginRedirect = () => {
  const location = useLocation();
  return (
    <Navigate
      to={`${ERoutes.Login}?${loginRedirectQuery}=${location.pathname}`}
      replace
    />
  );
};

/** Guards the contained routes against un-authenticated access */
export const LoginRedirectGuard = () => {
  const token = useAuthContext();

  if (token) return <Outlet />;
  else return <LoginRedirect />;
};
