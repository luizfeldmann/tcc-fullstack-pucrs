import { ProductDetailsURL } from "@/lib/constants/ERoutes";
import { GetProductById } from "@/lib/controllers/products";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { use } from "react";

export function ProductCard(props: { productId: string }) {
  const productDetails = use(GetProductById(props.productId));

  return (
    <Card>
      <CardActionArea href={ProductDetailsURL(props.productId)}>
        <Stack
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
        </Stack>
      </CardActionArea>
    </Card>
  );
}
