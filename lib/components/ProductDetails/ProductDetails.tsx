/* eslint-disable @next/next/no-img-element */
import { StoreDetailsURL } from "@/lib/constants/ERoutes";
import { GetProductById } from "@/lib/controllers/products";
import { GetStoreDetailsById } from "@/lib/controllers/stores";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";
import { ExpandMore } from "@mui/icons-material";
import {
  AccordionDetails,
  AccordionSummary,
  Divider,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { use } from "react";
import { FlatAccordion } from "../FlatAccordion/FlatAccordion";
import { getCurrencyFormat } from "@/lib/localization/utils/currency";
import { BuyButton } from "../BuyDialog/BuyButton";

/** Shows the details of a given store */
export function ProductDetails(props: { id: string }) {
  // Localization
  const { locale, LL } = useServerLocalization();

  // Query the store details
  const prodInfo = use(GetProductById(props.id));
  const storeInfo = use(GetStoreDetailsById(prodInfo.store));

  return (
    <>
      <Stack direction="row" flexWrap="wrap">
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="h4">{prodInfo.name}</Typography>
          <Typography variant="h5">
            {LL.Products.SoldBy()}
            <Link href={StoreDetailsURL(storeInfo.id)}>{storeInfo.name}</Link>
          </Typography>
        </Stack>

        <Stack
          sx={{
            flexGrow: 0,
            minWidth: "auto",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <Typography variant="h4">
            {getCurrencyFormat(locale).format(prodInfo.price)}
          </Typography>
          <BuyButton productInfo={prodInfo} />
        </Stack>
      </Stack>

      <Divider
        sx={{
          py: 1,
        }}
      />

      <FlatAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Products.DescriptionTitle()}
        </AccordionSummary>
        <AccordionDetails>{prodInfo.description}</AccordionDetails>
      </FlatAccordion>

      <FlatAccordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Products.ImagesTitle()}
        </AccordionSummary>
        <AccordionDetails>
          <ImageList
            cols={1}
            sx={{
              justifyItems: "center",
              margin: "auto",
            }}
          >
            {prodInfo.imageSrc.map((src, index) => (
              <ImageListItem
                key={index}
                sx={{
                  maxWidth: 512,
                }}
              >
                <img src={src} alt="" />
              </ImageListItem>
            ))}
          </ImageList>
        </AccordionDetails>
      </FlatAccordion>
    </>
  );
}
