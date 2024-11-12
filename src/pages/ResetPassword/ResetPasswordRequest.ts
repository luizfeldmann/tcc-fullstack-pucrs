import { AxiosError, AxiosResponse } from "axios";
import { appAxios } from "../../app-axios";
import StatusCode from "status-code-enum";

export enum EResetPasswordResult {
  /**The reset request was successful */
  OK = "ok",

  /** No such user */
  BadUser = "bad-user",

  /** Some generic error */
  InternalError = "error",
}

/** DTO for the login request */
export interface IResetPasswordRequest {
  emailAddress: string;
}

/** Requests the server to issue a password reset link */
export const ResetPasswordRequest = (
  req: IResetPasswordRequest,
  onResult: (result: EResetPasswordResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResult(EResetPasswordResult.InternalError);
        break;

      case StatusCode.SuccessOK:
        onResult(EResetPasswordResult.OK);
        break;

      case StatusCode.ClientErrorNotFound:
        onResult(EResetPasswordResult.BadUser);
        break;
    }
  };

  appAxios
    .post("password-reset", req)
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};
