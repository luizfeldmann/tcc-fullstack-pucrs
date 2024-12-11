import { TranslationFunctions } from "@/lib/localization/i18n-types";
import { IUserUpdatePasswordRequestData } from "@/lib/schemas/dto/UserPasswordUpdateRequest";
import {
  passwordConfirmationMatchRefinement,
  passwordSchema,
} from "@/lib/schemas/form/Password";
import { appAxios, withAuthorizationHeader } from "@/lib/singleton/app-axios";
import { AxiosError, AxiosResponse } from "axios";
import StatusCode from "status-code-enum";
import { z } from "zod";
import { useAuthContext } from "../Providers/AuthProvider";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/** Schema for changing the known password to a new one */
const updatePasswordFormSchema = (LL: TranslationFunctions) => {
  return z
    .object({
      oldPassword: passwordSchema(LL),
      password: passwordSchema(LL),
      confirmPassword: z.string().min(1, LL.PasswordRequirements.Required()),
    })
    .superRefine(passwordConfirmationMatchRefinement(LL));
};

/** Error result of the update password request */
enum EUpdatePasswordResult {
  /** Success */
  OK = "ok",

  /** The request was not authorized - possibly a bad token */
  Unauthorized = "unauthorized",

  /** Some generic error */
  InternalError = "error",
}

/** Performs the login request & invokes callback upon result */
const UpdatePasswordRequest = (
  token: string,
  req: IUserUpdatePasswordRequestData,
  onResult: (result: EUpdatePasswordResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResult(EUpdatePasswordResult.InternalError);
        break;

      case StatusCode.SuccessOK:
        onResult(EUpdatePasswordResult.OK);
        break;

      case StatusCode.ClientErrorUnauthorized:
      case StatusCode.ClientErrorForbidden:
        onResult(EUpdatePasswordResult.Unauthorized);
        break;
    }
  };

  appAxios
    .post("update-password", req, {
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

/** Logic for updating the password when the user still knows the old password */
export const useUpdateAccountPasswordForm = () => {
  // Get authentication
  const token = useAuthContext();

  // Localization for the form validation warnings
  const { LL } = useI18nContext();

  const formSchema = useMemo(() => {
    return updatePasswordFormSchema(LL);
  }, [LL]);

  type formData = z.infer<typeof formSchema>;

  // Internal state
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  // Use the react-hook-form
  const {
    control,
    reset: formReset,
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<formData>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  /** Callback when the user clicks to submit the form */
  const onSubmit = useCallback(
    (data: formData) => {
      if (!token?.token) return;
      // Set as loading
      setLoading(true);
      // Perform the request
      UpdatePasswordRequest(
        token?.token,
        {
          oldPassword: data.oldPassword,
          newPassword: data.password,
        },
        (result) => {
          // Update form state according to result
          setLoading(false);
          setSuccess(result === EUpdatePasswordResult.OK);
          // Update the error messages
          if (result === EUpdatePasswordResult.Unauthorized)
            setError("oldPassword", {
              type: "custom",
              message: LL.Login.Status.BadPass(),
            });
        }
      );
    },
    [token, LL, setError]
  );

  /** Callback to go back to initial state */
  const handleResetForm = useCallback(() => {
    setSuccess(false);
    formReset();
  }, [formReset, setSuccess]);

  return {
    isSuccess,
    isLoading,
    disableSubmit: !isValid || isLoading,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    handleResetForm,
  };
};
