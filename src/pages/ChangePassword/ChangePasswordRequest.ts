import { AxiosError, AxiosResponse } from "axios";
import { appAxios } from "../../app-axios";
import StatusCode from "status-code-enum";

/** DTO for the password change request */
export interface IChangePasswordRequest {
  token: string;
  password: string;
}

/** Error result of the change password request */
export enum EChangePasswordResult {
  /** Success */
  OK = "ok",

  /** The request was not authorized - possibly a bad token */
  Unauthorized = "unauthorized",

  /** Some generic error */
  InternalError = "error",
}

//! Performs the login request & invokes callback upon result
export const ChangePasswordRequest = (
  req: IChangePasswordRequest,
  onResult: (result: EChangePasswordResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    switch (resp?.status) {
      default:
        onResult(EChangePasswordResult.InternalError);
        break;

      case StatusCode.SuccessOK:
        onResult(EChangePasswordResult.OK);
        break;

      case StatusCode.ClientErrorUnauthorized:
      case StatusCode.ClientErrorForbidden:
        onResult(EChangePasswordResult.Unauthorized);
        break;
    }
  };

  appAxios
    .post("password-change", req)
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};
