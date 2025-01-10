import { StoreDetails } from "@/lib/components/StoreDetails/StoreDetails";
import { getServerLocalization } from "@/lib/hooks/useServerLocalization";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Stores.Title(),
  };
}

/**
 * Page with the details of one store
 */
export default async function StoreDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  return <StoreDetails id={id} />;
}
