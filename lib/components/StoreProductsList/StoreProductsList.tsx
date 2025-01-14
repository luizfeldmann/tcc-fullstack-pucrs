import { GetProductById, GetProductsByStore } from "@/lib/controllers/products";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { use } from "react";

function StoreProductCard(props: { productId: string }) {
  const productDetails = use(GetProductById(props.productId));

  return (
    <Card
      component={Stack}
      direction="row"
      sx={{
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        sx={{ maxWidth: 128, objectFit: "cover" }}
        image={productDetails.imageSrc.at(0)}
        alt=""
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="h6" component="div">
            {productDetails.name}
          </Typography>
          <Typography variant="h6" color="primary">
            ${productDetails.price}
          </Typography>
        </Box>
        <CardContent
          sx={{
            p: 1,
            pt: 0,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {productDetails.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

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
        <StoreProductCard key={p} productId={p} />
      ))}
    </Box>
  );
}
