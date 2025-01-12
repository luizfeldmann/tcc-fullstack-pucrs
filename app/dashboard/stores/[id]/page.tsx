import { StoreDetails } from "@/lib/components/StoreDetails/StoreDetails";
import { GetStoreDetailsById } from "@/lib/controllers/stores";
import { Metadata } from "next";

interface IStoreDetailsPageParams {
  id: string;
}

/** Reads the metadata of the page */
export async function generateMetadata(props: {
  params: Promise<IStoreDetailsPageParams>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const storeInfo = await GetStoreDetailsById(id);

  return {
    title: storeInfo.name,
  };
}

/**
 * Page with the details of one store
 */
export default async function StoreDetailsPage(props: {
  params: Promise<IStoreDetailsPageParams>;
}) {
  const { id } = await props.params;
  return <StoreDetails id={id} />;
}
