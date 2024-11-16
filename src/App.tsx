import { Route, Routes } from "react-router-dom";
import { ERoutes } from "./routes.ts";
import Home from "./pages/Home/Home.tsx";
import About from "./pages/About/About.tsx";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import Verify from "./pages/Verify/Verify.tsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.tsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import Account from "./pages/Account/Account.tsx";
import Main from "./pages/Main/Main.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import Logout from "./pages/Logout/Logout.tsx";
import TransactionStatement from "./pages/Payment/TransactionStatement.tsx";
import MakeDeposit from "./pages/Payment/MakeDeposit.tsx";

/** Application top-level */
function App() {
  /** Global state of the authentication of the session */
  const auth = useAuth();

  return (
    <div>
      <Routes>
        {/** When logged of, present the 'Home' landing page */}
        {!auth.token && <Route index element={<Home />} />}

        {/** Routes using the common layout */}
        <Route path={ERoutes.Index} element={<Layout />}>
          {/** The user's 'Main' is only available when logged-in */}
          {auth.token && <Route index element={<Main />} />}

          {/** For the following routes the authentication is mandatory */}
          <Route
            path={ERoutes.Account}
            element={<Account token={auth.token} />}
          />
          <Route
            path={ERoutes.Transactions}
            element={<TransactionStatement token={auth.token} />}
          />
          <Route
            path={ERoutes.Deposit}
            element={<MakeDeposit token={auth.token} />}
          />
        </Route>

        {/** Routes NOT using the layout */}
        <Route path={ERoutes.About} element={<About />} />
        <Route
          path={ERoutes.Login}
          element={<Login onLogin={auth.doLogin} />}
        />
        <Route path={ERoutes.Signup} element={<Signup />} />
        <Route path={ERoutes.Verify} element={<Verify />} />
        <Route path={ERoutes.ChangePassword} element={<ChangePassword />} />
        <Route path={ERoutes.ResetPassword} element={<ResetPassword />} />

        {/** Virtual page only used to log the user out/off */}
        <Route
          path={ERoutes.Logout}
          element={<Logout onLogout={auth.doLogoff} />}
        />
      </Routes>
    </div>
  );
}

export default App;
