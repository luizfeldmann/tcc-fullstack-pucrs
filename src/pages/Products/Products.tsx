import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import ProductsList from "./ProductsList";

/**
 * Page where the user may find all the available products
 */
const Products = () => {
  const { LL } = useI18nContext();

  return (
    <Stack spacing={1}>
      <h1>{LL.Products.Title()}</h1>
      <ProductsList />
    </Stack>
  );
};

export default Products;
