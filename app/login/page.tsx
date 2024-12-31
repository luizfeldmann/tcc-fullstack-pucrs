import { FormPage } from "@/lib/components/FormPage/FormPage";
import { LoginForm } from "@/lib/components/LoginForm/LoginForm";
import { ERoutes } from "@/lib/constants/ERoutes";
import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { Link } from "@mui/material";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Login.Title(),
  };
}

/**
 * The login page for users to sign-in
 */
const Login = () => {
  const { LL } = useServerLocalization();

  return (
    <FormPage>
      <h1>{LL.Login.Title()}</h1>
      <LoginForm />
      <center>
        <Link href={ERoutes.ForgotPassword}>
          {LL.Login.LinkForgotPassword()}
        </Link>
      </center>
    </FormPage>
  );
};

export default Login;
