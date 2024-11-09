import { AxiosError, AxiosResponse } from "axios";
import { appAxios } from "../../app-axios";
import StatusCode from "status-code-enum";
import { z } from "zod";

/** Error result of the login request */
export enum ELoginError {
  /** The user does not exist */
  BadUser = "bad-user",

  /** The password is wrong */
  BadPass = "bad-pass",

  /** Some generic error */
  InternalError = "error",
}

/** Result of the log-in operation */
export interface ILoginResultError {
  /** The result of the login operation */
  status: ELoginError;
}

/** Success results of the login request */
export enum ELoginSuccess {
  /** Login success */
  OK = "ok",
}

/** Result of the log-in operation when successful */
export interface ILoginResultSuccess {
  /** The result of the login operation */
  status: ELoginSuccess;

  /** When successful, the token used to authenticate the user */
  token: string;
}

export type ILoginResult = ILoginResultError | ILoginResultSuccess;

/** DTO for the login request */
export interface ILoginRequest {
  emailAddress: string;
  password: string;
}

/** DTO for the login response */
const loginResponse = z.object({
  token: z.string(),
});

//! Performs the login request & invokes callback upon result
export const LoginRequest = (
  req: ILoginRequest,
  onResult: (result: ILoginResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResult({ status: ELoginError.InternalError });
        break;

      case StatusCode.SuccessOK:
        {
          const { data, error } = loginResponse.safeParse(resp.data);

          if (error) onResult({ status: ELoginError.InternalError });
          else
            onResult({
              status: ELoginSuccess.OK,
              token: data.token,
            });
        }
        break;

      case StatusCode.ClientErrorNotFound:
        onResult({ status: ELoginError.BadUser });
        break;

      case StatusCode.ClientErrorUnauthorized:
      case StatusCode.ClientErrorForbidden:
        onResult({ status: ELoginError.BadPass });
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
