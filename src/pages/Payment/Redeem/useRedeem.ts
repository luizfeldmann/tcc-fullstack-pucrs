import { z } from "zod";
import { TranslationFunctions } from "../../../localization/i18n-types";
import { IRedeemFormState } from "./IRedeemFormState";
import { useI18nContext } from "../../../localization/i18n-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERedeemResult, RedeemRequest } from "./RedeemRequest";
import { invalidateBalanceQuery } from "../../../components/BalanceCard/BalanceQuery";

/** Validation of the form for the redeem code */
const redeemSchemaFromLocale = (LL: TranslationFunctions) => {
  return z.object({
    redeemCode: z
      .string()
      .min(1, LL.Deposit.PaymentMethodRedeem.Form.CodeFieldRequired()),
  });
};

export const useRedeem = (token: string): IRedeemFormState => {
  /** Localization of the form schema */
  const { LL } = useI18nContext();

  /** Schema for validation of the fields */
  const redeemFormSchema = useMemo(() => {
    return redeemSchemaFromLocale(LL);
  }, [LL]);

  type redeemFormData = Zod.infer<typeof redeemFormSchema>;

  /** Form logic */
  const {
    control,
    reset,
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<redeemFormData>({
    mode: "all",
    resolver: zodResolver(redeemFormSchema),
  });

  /** Loading indication while request is pending */
  const [state, setState] = useState<{ loading: boolean; success?: string }>({
    loading: false,
    success: undefined,
  });

  /** Invoked on the response of the redeem request */
  const onResult = (result: ERedeemResult) => {
    setState((state) => ({
      ...state,
      loading: false,
    }));

    switch (result) {
      case ERedeemResult.OK:
        setState((state) => ({
          ...state,
          success: LL.Deposit.PaymentMethodRedeem.Status.Success(),
        }));
        // Make sure the balance is read again
        invalidateBalanceQuery();
        break;

      case ERedeemResult.ExpiredCode:
        setError("redeemCode", {
          type: "custom",
          message: LL.Deposit.PaymentMethodRedeem.Status.ExpiredCode(),
        });
        break;

      case ERedeemResult.BadCode:
        setError("redeemCode", {
          type: "custom",
          message: LL.Deposit.PaymentMethodRedeem.Status.BadCode(),
        });
        break;

      case ERedeemResult.InternalError:
        setError("redeemCode", {
          type: "custom",
          message: LL.Deposit.PaymentMethodRedeem.Status.UnknownError(),
        });
        break;
    }
  };

  /** Invoked when the user submits a valid form */
  const onSubmitInternal = (data: redeemFormData) => {
    // Set to the loading state
    setState((state) => {
      return {
        ...state,
        loading: true,
      };
    });

    // Perform the actual request
    RedeemRequest(token, data, onResult);
  };

  /** Invoked to clear and reset the form state */
  const onClear = () => {
    setState({
      loading: false,
      success: undefined,
    });
    reset();
  };

  return {
    control,
    errors,
    success: state.success,
    loading: state.loading,
    disableSubmit: !isValid || state.loading || undefined !== state.success,
    onSubmit: handleSubmit(onSubmitInternal),
    onClear,
  };
};
