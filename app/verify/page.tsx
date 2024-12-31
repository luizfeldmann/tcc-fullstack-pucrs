import { FormPage } from "@/lib/components/FormPage/FormPage";
import { VerifyAccountIndicator } from "@/lib/components/VerifyAccountIndicator/VerifyAccountIndicator";
import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Verify.Title(),
  };
}

/** New account verification page accessed from the verification link */
export default function Verify() {
  const { LL } = useServerLocalization();

  return (
    <FormPage>
      <h1>{LL.Verify.Title()}</h1>
      <VerifyAccountIndicator />
    </FormPage>
  );
}
