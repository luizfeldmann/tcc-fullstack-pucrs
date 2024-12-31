import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { SignupForm } from "../../lib/components/SignupForm/SignupForm";
import { FormPage } from "@/lib/components/FormPage/FormPage";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Signup.Title(),
  };
}

/** Page where the user may create a new account */
const Signup = () => {
  const { LL } = useServerLocalization();

  return (
    <FormPage>
      <h1>{LL.Signup.Title()}</h1>
      <SignupForm />
    </FormPage>
  );
};

export default Signup;
