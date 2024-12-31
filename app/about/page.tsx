import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.About.Title(),
  };
}

/** Page with the website general information */
export default function About() {
  const { LL } = useServerLocalization();

  return (
    <div>
      <h1>{LL.About.Title()}</h1>
    </div>
  );
}
