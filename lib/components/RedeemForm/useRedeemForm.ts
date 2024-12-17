import { useI18nContext } from "@/lib/localization/i18n-react";
import { TranslationFunctions } from "@/lib/localization/i18n-types";
import { z } from "zod";
import { IRedeemFormProps } from "./IRedeemFormProps";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import StatusCode from "status-code-enum";
import { appAxios, withAuthorizationHeader } from "@/lib/singleton/app-axios";
import { IRedeemCodeRequestData } from "@/lib/schemas/dto/RedeemCodeRequest";
import { useInvalidateBalanceQuery } from "../BalanceCard/useBalanceQuery";
import { useAuthContext } from "../Providers/AuthProvider";

enum ERedeemResult {
  /** The reset request was successful */
  OK = "ok",

  /** The code does not exist */
  BadCode = "bad-code",

  /** The code has expired or was already used */
  ExpiredCode = "expired-code",

  /** Some generic error */
  InternalError = "error",
}

/** Requests the server to issue a password reset link */
const RedeemRequest = (
  token: string | undefined,
  req: IRedeemCodeRequestData,
  onResult: (result: ERedeemResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResult(ERedeemResult.InternalError);
        break;

      case StatusCode.SuccessOK:
        onResult(ERedeemResult.OK);
        break;

      case StatusCode.ClientErrorNotFound:
        onResult(ERedeemResult.BadCode);
        break;

      case StatusCode.ClientErrorGone:
        onResult(ERedeemResult.ExpiredCode);
        break;
    }
  };

  if (!token) return onResult(ERedeemResult.BadCode);

  appAxios
    .post("transactions/redeem", req, {
      headers: {
        ...withAuthorizationHeader(token),
      },
    })
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};

/** Validation of the form for the redeem code */
const redeemSchemaFromLocale = (LL: TranslationFunctions) => {
  return z.object({
    redeemCode: z
      .string()
      .min(1, LL.Deposit.PaymentMethodRedeem.Form.CodeFieldRequired()),
  });
};

/**
 * Logic for the redeemable code form
 */
export const useRedeem = (): IRedeemFormProps => {
  // Localization of the form schema
  const { LL } = useI18nContext();

  /** Schema for validation of the fields */
  const redeemFormSchema = useMemo(() => {
    return redeemSchemaFromLocale(LL);
  }, [LL]);

  type redeemFormData = Zod.infer<typeof redeemFormSchema>;

  // Form logic
  const {
    control,
    reset,
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<redeemFormData>({
    mode: "all",
    resolver: zodResolver(redeemFormSchema),
    defaultValues: {
      redeemCode: "",
    },
  });

  /** Loading indication while request is pending */
  const [state, setState] = useState<{ loading: boolean; success?: string }>({
    loading: false,
    success: undefined,
  });

  // Get a callback that will invalidate the balance
  const authContext = useAuthContext();
  const invalidateBalanceQuery = useInvalidateBalanceQuery(authContext?.token);

  /** Invoked on the response of the redeem request */
  const onResult = useCallback(
    (result: ERedeemResult) => {
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
    },
    [LL, setState, setError, invalidateBalanceQuery]
  );

  /** Invoked when the user submits a valid form */
  const onSubmitInternal = useCallback(
    (data: redeemFormData) => {
      // Set to the loading state
      setState((state) => {
        return {
          ...state,
          loading: true,
        };
      });

      // Perform the actual request
      RedeemRequest(authContext?.token, data, onResult);
    },
    [authContext?.token, setState, onResult]
  );

  /** Invoked to clear and reset the form state */
  const onClear = useCallback(() => {
    setState({
      loading: false,
      success: undefined,
    });
    reset();
  }, [reset, setState]);

  return {
    control,
    errors,
    success: state.success,
    loading: state.loading,
    onClear,
    submit: {
      disabled: !isValid || state.loading || undefined !== state.success,
      onClick: handleSubmit(onSubmitInternal),
    },
  };
};
