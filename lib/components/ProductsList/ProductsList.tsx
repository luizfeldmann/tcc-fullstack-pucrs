import { GetProductsList } from "@/lib/controllers/products";
import { use } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Stack } from "@mui/material";

/** A list of cards of products */
export function ProductsList() {
  const productIds = use(GetProductsList());

  return (
    <Stack spacing={1}>
      {productIds.map((id) => (
        <ProductCard key={id} productId={id} />
      ))}
    </Stack>
  );
}
