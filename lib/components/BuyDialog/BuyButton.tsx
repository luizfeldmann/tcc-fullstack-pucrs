"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BuyDialog } from "./BuyDialog";
import { useState } from "react";
import { IProductDetailsResponseData } from "@/lib/schemas/dto/ProductDetailsResponse";

export function BuyButton(props: { productInfo: IProductDetailsResponseData }) {
  const { LL } = useI18nContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          margin: "auto",
        }}
        startIcon={<ShoppingCart />}
        onClick={() => setOpen(true)}
      >
        {LL.Products.BuyBtn()}
      </Button>
      <BuyDialog
        open={open}
        onClose={() => setOpen(false)}
        prodInfo={props.productInfo}
      />
    </>
  );
}
