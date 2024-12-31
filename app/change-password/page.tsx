import { ChangePasswordForm } from "@/lib/components/ChangePasswordForm/ChangePasswordForm";
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
    title: LL.ChangePassword.Title(),
  };
}

/** Page for the user to insert a new password after clicking the confirmation mail */
const ChangePassword = () => {
  const { LL } = useServerLocalization();

  return (
    <FormPage>
      <h1>{LL.ChangePassword.Title()}</h1>
      <ChangePasswordForm />
    </FormPage>
  );
};

export default ChangePassword;
