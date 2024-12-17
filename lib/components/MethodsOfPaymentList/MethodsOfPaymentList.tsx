import { Stack } from "@mui/material";
import { PixMethod } from "./PixMethod";
import { CreditCardMethod } from "./CreditCardMethod";
import { RedeemMethod } from "./RedeemMethod";

/**
 * Group of accordions with multiple methods of payment implement inside
 */
export const MethodsOfPaymentList = () => {
  return (
    <Stack>
      <PixMethod />
      <CreditCardMethod />
      <RedeemMethod />
    </Stack>
  );
};
