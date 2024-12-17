"use client";

import { ArrowDownward, Check, Money, Redeem } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { RedeemForm } from "../RedeemForm/RedeemForm";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { useRedeem } from "../RedeemForm/useRedeemForm";

export const RedeemMethod = () => {
  // Use localization
  const { LL } = useI18nContext();

  // Use logic for each payment method
  const redeemState = useRedeem();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Redeem />
        <Typography>{LL.Deposit.PaymentMethodRedeem.Title()}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{LL.Deposit.PaymentMethodRedeem.Description()}</Typography>
        <RedeemForm {...redeemState} />
      </AccordionDetails>
      <AccordionActions>
        <Button
          {...redeemState.submit}
          startIcon={
            redeemState.loading ? (
              <CircularProgress />
            ) : redeemState.success !== undefined ? (
              <Check />
            ) : (
              <Money />
            )
          }
        >
          {LL.Deposit.PaymentMethodRedeem.Form.ButtonSubmit()}
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
