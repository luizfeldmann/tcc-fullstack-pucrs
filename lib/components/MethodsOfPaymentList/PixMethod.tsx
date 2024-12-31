import { ArrowDownward, Pix } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
import { ChipComingSoon } from "./ChipComingSoon";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";

export const PixMethod = () => {
  const { LL } = useServerLocalization();

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
