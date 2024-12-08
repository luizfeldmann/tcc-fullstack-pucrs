import { useI18nContext } from "@/lib/localization/i18n-react";
import { TranslationFunctions } from "@/lib/localization/i18n-types";
import { IForgotPasswordRequestData } from "@/lib/schemas/dto/ForgotPasswordRequest";
import { appAxios } from "@/lib/singleton/app-axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import StatusCode from "status-code-enum";
import { z } from "zod";

/** Response statuses for the forgot password request */
enum EForgotPasswordResult {
  /**The reset request was successful */
  OK = "ok",

  /** No such user */
  BadUser = "bad-user",

  /** Some generic error */
  InternalError = "error",
}

/** Requests the server to issue a password reset link */
const ForgotPasswordRequest = (
  req: IForgotPasswordRequestData,
  onResult: (result: EForgotPasswordResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResult(EForgotPasswordResult.InternalError);
        break;

      case StatusCode.SuccessOK:
        onResult(EForgotPasswordResult.OK);
        break;

      case StatusCode.ClientErrorNotFound:
        onResult(EForgotPasswordResult.BadUser);
        break;
    }
  };

  appAxios
    .post("forgot-password", req)
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};

/** Validation of the fields for requesting a password reset */
const forgotPasswordFormSchemaFromLocale = (LL: TranslationFunctions) => {
  return z.object({
    emailAddress: z
      .string()
      .min(1, LL.ForgotPassword.Form.EmailRequired())
      .email(LL.ForgotPassword.Form.EmailInvalid()),
  });
};

/** Hook implementing the logic of the password-reset-request form */
export const useForgotPasswordForm = () => {
  /** Localization of the form schema */
  const { LL } = useI18nContext();

  /** Validation of the fields for requesting a password reset */
  const forgotPasswordFormSchema = useMemo(() => {
    return forgotPasswordFormSchemaFromLocale(LL);
  }, [LL]);

  type forgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

  /** Form logic */
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<forgotPasswordFormData>({
    mode: "all",
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  /** Invoked when the password reset request returns */
  const onResult = useCallback(
    (result: EForgotPasswordResult) => {
      setLoading(false);
      if (result === EForgotPasswordResult.BadUser) {
        control.setError("emailAddress", {
          type: "custom",
          message: LL.ForgotPassword.Status.BadUser(),
        });
      } else if (result === EForgotPasswordResult.OK) {
        setSuccess(true);
      }
    },
    [LL, control, setLoading, setSuccess]
  );

  /** Invoked when the user submits a valid form asking to reset the password */
  const onSubmit = useCallback(
    (data: forgotPasswordFormData) => {
      // Mark the form as in-progress
      setLoading(true);
      ForgotPasswordRequest(
        {
          emailAddress: data.emailAddress,
        },
        onResult
      );
    },
    [setLoading, onResult]
  );

  return {
    success,
    loading,
    disableSubmit: !isValid || loading || !captcha,
    control,
    errors,
    setCaptcha,
    onSubmitHandler: handleSubmit(onSubmit),
  };
};
