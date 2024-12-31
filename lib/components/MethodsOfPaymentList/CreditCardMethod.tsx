import { ArrowDownward, CreditCard } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
import { ChipComingSoon } from "./ChipComingSoon";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";

export const CreditCardMethod = () => {
  const { LL } = useServerLocalization();

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
