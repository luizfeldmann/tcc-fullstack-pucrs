"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { Alert, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IRedeemFormProps } from "./IRedeemFormProps";

/**
 * Form where the user inputs a redeemable code
 */
export const RedeemForm = (params: IRedeemFormProps) => {
  const { LL } = useI18nContext();

  // Present the success message replacing the form
  if (params.success)
    return (
      <Alert severity="success" onClose={params.onClear}>
        {params.success}
      </Alert>
    );

  // Present the regular form
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
