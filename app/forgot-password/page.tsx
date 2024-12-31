import { ForgotPasswordForm } from "@/lib/components/ForgotPasswordForm/ForgotPasswordForm";
import { FormPage } from "@/lib/components/FormPage/FormPage";
import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.ForgotPassword.Title(),
  };
}

/** Page for the user who forgot the password to request a reset */
const ForgotPassword = () => {
  const { LL } = useServerLocalization();

  return (
    <FormPage>
      <h1>{LL.ForgotPassword.Title()}</h1>
      <ForgotPasswordForm />
    </FormPage>
  );
};

export default ForgotPassword;
