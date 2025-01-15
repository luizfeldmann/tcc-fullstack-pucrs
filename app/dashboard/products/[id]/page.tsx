import { ProductDetails } from "@/lib/components/ProductDetails/ProductDetails";
import { GetProductById } from "@/lib/controllers/products";
import { Metadata } from "next";

interface IProductDetailsPageParams {
  id: string;
}

/** Reads the metadata of the page */
export async function generateMetadata(props: {
  params: Promise<IProductDetailsPageParams>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const prodInfo = await GetProductById(id);

  return {
    title: prodInfo.name,
  };
}

/**
 * Page with the details of one product
 */
export default async function ProductDetailsPage(props: {
  params: Promise<IProductDetailsPageParams>;
}) {
  const { id } = await props.params;
  return <ProductDetails id={id} />;
}
