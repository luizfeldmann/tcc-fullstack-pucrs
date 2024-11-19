import { Alert, Stack, TextField } from "@mui/material";
import { IRedeemFormState } from "./IRedeemFormState";
import { Controller } from "react-hook-form";
import { useI18nContext } from "../../../localization/i18n-react";

export const RedeemForm = (params: IRedeemFormState) => {
  const { LL } = useI18nContext();

  /** Present the success message */
  if (params.success)
    return (
      <Alert severity="success" onClose={params.onClear}>
        {params.success}
      </Alert>
    );

  /** Present the regular form */
  return (
    <form>
      <Stack>
        <Controller
          name="redeemCode"
          control={params.control}
          render={({ field }) => (
            <TextField
              disabled={params.loading}
              label={LL.Deposit.PaymentMethodRedeem.Form.CodeField()}
              helperText={params.errors.redeemCode?.message}
              error={params.errors.redeemCode !== undefined}
              {...field}
            />
          )}
        />
      </Stack>
    </form>
  );
};
