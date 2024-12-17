"use client";

import { ArrowDownward, Pix } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
import { ChipComingSoon } from "./ChipComingSoon";
import { useI18nContext } from "@/lib/localization/i18n-react";

export const PixMethod = () => {
  const { LL } = useI18nContext();

  return (
    <Accordion disabled>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Pix />
        <Typography>{LL.Deposit.PaymentMethodPix.Title()}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ChipComingSoon />
      </AccordionSummary>
    </Accordion>
  );
};
