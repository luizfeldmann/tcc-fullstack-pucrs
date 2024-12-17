"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { Chip } from "@mui/material";

/** Informs the payment method is still not implemented */
export const ChipComingSoon = () => {
  const { LL } = useI18nContext();

  return (
    <Chip
      color="success"
      variant="outlined"
      label={LL.Deposit.PaymentMethodComingSoon()}
    />
  );
};
