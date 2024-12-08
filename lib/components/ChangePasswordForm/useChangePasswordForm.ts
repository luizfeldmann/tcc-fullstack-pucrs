import { useI18nContext } from "@/lib/localization/i18n-react";
import { TranslationFunctions } from "@/lib/localization/i18n-types";
import { IChangePasswordRequestData } from "@/lib/schemas/dto/ChangePasswordRequest";
import {
  passwordConfirmationMatchRefinement,
  passwordSchema,
} from "@/lib/schemas/form/Password";
import { appAxios } from "@/lib/singleton/app-axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import StatusCode from "status-code-enum";
import { z } from "zod";

/** Full signup form validation schema */
const changePasswordFormSchema = (LL: TranslationFunctions) => {
  return z
    .object({
      password: passwordSchema(LL),
      confirmPassword: z.string().min(1, LL.PasswordRequirements.Required()),
    })
    .superRefine(passwordConfirmationMatchRefinement(LL));
};

/** Status or result of the change password request */
export enum EChangePasswordStatus {
  /** The form is in it's initial state */
  Initial = "initial",

  /** Loading the request */
  Loading = "loading",

  /** Success */
  OK = "ok",

  /** The request was not authorized - possibly a bad token */
  Unauthorized = "unauthorized",

  /** Some generic error */
  InternalError = "error",
}

//! Performs the login request & invokes callback upon result
const ChangePasswordRequest = (
  req: IChangePasswordRequestData,
  onResult: (result: EChangePasswordStatus) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResult(EChangePasswordStatus.InternalError);
        break;

      case StatusCode.SuccessOK:
        onResult(EChangePasswordStatus.OK);
        break;

      case StatusCode.ClientErrorUnauthorized:
      case StatusCode.ClientErrorForbidden:
        onResult(EChangePasswordStatus.Unauthorized);
        break;
    }
  };

  appAxios
    .post("change-password", req)
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};

/** Hook with logic for new password form */
export const useChangePasswordForm = (token: string) => {
  /** Localization for the form validation warnings */
  const { LL } = useI18nContext();

  const formSchema = useMemo(() => {
    return changePasswordFormSchema(LL);
  }, [LL]);

  type changePasswordFormData = z.infer<typeof formSchema>;

  // Form logics
  const [status, setStatus] = useState(EChangePasswordStatus.Initial);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<changePasswordFormData>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  /** Called when the user submits the form */
  const onSubmit = useCallback(
    (data: changePasswordFormData) => {
      // Mark the form as in-progress
      setStatus(EChangePasswordStatus.Loading);
      // Send out the request
      ChangePasswordRequest(
        {
          token,
          password: data.password,
        },
        setStatus
      );
    },
    [token, setStatus]
  );

  // Return hook logic to component
  const loading = status == EChangePasswordStatus.Loading;

  return {
    control,
    errors,
    status,
    disableSubmit: !isValid || loading,
    loading,
    onSubmitHandler: handleSubmit(onSubmit),
  };
};
