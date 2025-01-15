"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { getCurrencyFormat } from "@/lib/localization/utils/currency";
import { IProductDetailsResponseData } from "@/lib/schemas/dto/ProductDetailsResponse";
import { Check, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMemo } from "react";

export function BuyDialog(props: {
  open: boolean;
  onClose: () => void;
  prodInfo: IProductDetailsResponseData;
}) {
  const { locale, LL } = useI18nContext();

  // Format a full description of the operation
  const detailsText = useMemo(() => {
    const fmt = getCurrencyFormat(locale);
    return LL.Products.BuyDialog.Details(
      props.prodInfo.name,
      fmt.format(props.prodInfo.price)
    );
  }, [locale, LL, props.prodInfo.name, props.prodInfo.price]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{LL.Products.BuyDialog.Title()}</DialogTitle>
      <DialogContent>
        <DialogContentText>{detailsText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Close />} onClick={props.onClose}>
          {LL.Products.BuyDialog.Cancel()}
        </Button>
        <Button startIcon={<Check />} onClick={props.onClose} autoFocus>
          {LL.Products.BuyDialog.Submit()}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
