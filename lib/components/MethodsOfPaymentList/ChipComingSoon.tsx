import { useServerLocalization } from "@/lib/hooks/useServerLocalization";
import { Chip } from "@mui/material";

/** Informs the payment method is still not implemented */
export const ChipComingSoon = () => {
  const { LL } = useServerLocalization();

  return (
    <Chip
      color="success"
      variant="outlined"
      label={LL.Deposit.PaymentMethodComingSoon()}
    />
  );
};
