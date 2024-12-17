"use client";

import { ArrowDownward, CreditCard } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
import { ChipComingSoon } from "./ChipComingSoon";
import { useI18nContext } from "@/lib/localization/i18n-react";

export const CreditCardMethod = () => {
  const { LL } = useI18nContext();

  return (
    <Accordion disabled>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <CreditCard />
        <Typography>{LL.Deposit.PaymentMethodCreditCard.Title()}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ChipComingSoon />
      </AccordionSummary>
    </Accordion>
  );
};
