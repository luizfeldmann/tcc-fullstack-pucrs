import {
  Redeem,
  ArrowDownward,
  Pix,
  CreditCard,
  Money,
  Check,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import { useCallback } from "react";
import { useRedeem } from "./Redeem/useRedeem";
import { RedeemForm } from "./Redeem/RedeemForm";

/** Parameters passed to the list of payment methods */
export interface IMethodsOfPaymentListParams {
  token: string;
}

/**
 * Group of accordions with multiple methods of payment implement inside
 */
export const MethodsOfPaymentList = (params: IMethodsOfPaymentListParams) => {
  /** Use localization */
  const { LL } = useI18nContext();

  /** Informs the payment method is still not implemented */
  const ComingSoonChip = useCallback(() => {
    return (
      <Chip
        color="success"
        variant="outlined"
        label={LL.Deposit.PaymentMethodComingSoon()}
      />
    );
  }, [LL]);

  /** Logic for the redeem code */
  const redeemState = useRedeem(params.token);

  return (
    <Box>
      {/** PIX */}
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ArrowDownward />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Pix />
          <Typography>{LL.Deposit.PaymentMethodPix.Title()}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ComingSoonChip />
        </AccordionSummary>
      </Accordion>

      {/** Credit card */}
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ArrowDownward />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <CreditCard />
          <Typography>{LL.Deposit.PaymentMethodCreditCard.Title()}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ComingSoonChip />
        </AccordionSummary>
      </Accordion>

      {/** Redeem code */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownward />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Redeem />
          <Typography>{LL.Deposit.PaymentMethodRedeem.Title()}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {LL.Deposit.PaymentMethodRedeem.Description()}
          </Typography>
          <RedeemForm {...redeemState} />
        </AccordionDetails>
        <AccordionActions>
          <Button
            startIcon={
              redeemState.loading ? (
                <CircularProgress />
              ) : redeemState.success !== undefined ? (
                <Check />
              ) : (
                <Money />
              )
            }
            disabled={redeemState.disableSubmit}
            onClick={redeemState.onSubmit}
          >
            {LL.Deposit.PaymentMethodRedeem.Form.ButtonSubmit()}
          </Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};
