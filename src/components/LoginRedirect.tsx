import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ERoutes } from "../routes";

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

/** Arguments passed to the authentication guard */
export interface ILoginRedirectAuthGuardParams {
  token?: string;
}

/** Guards the contained routes agains un-authenticated access */
export const LoginRedirectGuard = (params: ILoginRedirectAuthGuardParams) => {
  if (params.token) return <Outlet />;
  else return <LoginRedirect />;
};
