import { ProductsList } from "@/lib/components/ProductsList/ProductsList";
import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { Stack } from "@mui/material";
import { Metadata } from "next";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Products.Title(),
  };
}

/**
 * Page where the user may find various products
 */
export default function ProductsPage() {
  const { LL } = useServerLocalization();

  return (
    <Stack spacing={1}>
      <h1>{LL.Products.Title()}</h1>
      <ProductsList />
    </Stack>
  );
}
