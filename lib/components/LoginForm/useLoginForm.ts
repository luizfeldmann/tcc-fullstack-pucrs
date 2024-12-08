import { useI18nContext } from "@/lib/localization/i18n-react";
import { TranslationFunctions } from "@/lib/localization/i18n-types";
import {
  ILoginRequestData,
  ILoginResponseData,
  loginResponseSchema,
} from "@/lib/schemas/dto/LoginRequestResponse";
import { passwordSchema } from "@/lib/schemas/form/Password";
import { appAxios } from "@/lib/singleton/app-axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import StatusCode from "status-code-enum";
import { z } from "zod";

/** Error result of the login request */
enum ELoginStatus {
  /** Login success */
  OK = "ok",

  /** The user does not exist */
  BadUser = "bad-user",

  /** The password is wrong */
  BadPass = "bad-pass",

  /** Some generic error */
  InternalError = "error",
}

/** Result of the log-in operation */
interface ILoginResult {
  status: ELoginStatus;
  response?: ILoginResponseData;
}

/** Sends a signup request to the server and invokes a callback upon the result */
const LoginRequest = (
  req: ILoginRequestData,
  onResponse: (result: ILoginResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResponse({ status: ELoginStatus.InternalError });
        break;

      case StatusCode.SuccessOK:
        {
          const { data, error } = loginResponseSchema.safeParse(resp.data);

          if (error) onResponse({ status: ELoginStatus.InternalError });
          else
            onResponse({
              status: ELoginStatus.OK,
              response: data,
            });
        }
        break;

      case StatusCode.ClientErrorNotFound:
        onResponse({ status: ELoginStatus.BadUser });
        break;

      case StatusCode.ClientErrorUnauthorized:
      case StatusCode.ClientErrorForbidden:
        onResponse({ status: ELoginStatus.BadPass });
        break;
    }
  };

  appAxios
    .post("login", req)
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};

/** Full signup form validation schema with localized warnings */
const loginFormSchemaFromLocale = (LL: TranslationFunctions) => {
  return z.object({
    emailAddress: z
      .string()
      .min(1, LL.Login.Form.EmailRequired())
      .email(LL.Login.Form.EmailInvalid()),
    password: passwordSchema(LL),
  });
};

/** Hook with logic for the login form */
export const useLoginForm = (
  onLoginSuccess: (resp: ILoginResponseData) => void
) => {
  /** Localization texts */
  const { LL } = useI18nContext();

  const loginFormSchema = useMemo(() => {
    return loginFormSchemaFromLocale(LL);
  }, [LL]);

  type loginFormData = z.infer<typeof loginFormSchema>;

  /** Form logic */
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<loginFormData>({
    mode: "all",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  // Callback invoked when the server responds from the login request
  const OnLoginResult = useCallback(
    (result: ILoginResult) => {
      setLoading(false);
      switch (result.status) {
        case ELoginStatus.BadPass:
          control.setError("password", {
            type: "custom",
            message: LL.Login.Status.BadPass(),
          });
          break;
        case ELoginStatus.BadUser:
          control.setError("emailAddress", {
            type: "custom",
            message: LL.Login.Status.BadUser(),
          });
          break;
        case ELoginStatus.InternalError:
          break;
        case ELoginStatus.OK:
          onLoginSuccess(result.response!);
          break;
      }
    },
    [LL, setLoading, control, onLoginSuccess]
  );

  // Handle the submit request
  const onSubmit = useCallback(
    (data: loginFormData) => {
      setLoading(true);
      LoginRequest(
        {
          emailAddress: data.emailAddress,
          password: data.password,
        },
        OnLoginResult
      );
    },
    [setLoading, OnLoginResult]
  );

  // Return data to the component
  return {
    control,
    errors,
    loading,
    disableSubmit: !isValid || loading,
    onSubmitHandler: handleSubmit(onSubmit),
  };
};
