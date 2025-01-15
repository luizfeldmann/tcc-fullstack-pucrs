import { GetProductsByStore } from "@/lib/controllers/products";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";
import { Alert, Box } from "@mui/material";
import { use } from "react";
import { ProductCard } from "../ProductCard/ProductCard";

export function StoreProductsList(props: { storeId: string }) {
  const { LL } = useServerLocalization();

  // Query the products associated with this store
  const storeProducts = use(GetProductsByStore(props.storeId));

  if (storeProducts.length === 0)
    return <Alert severity="info">{LL.Stores.NoProducts()}</Alert>;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {storeProducts.map((p) => (
        <ProductCard key={p} productId={p} />
      ))}
    </Box>
  );
}
