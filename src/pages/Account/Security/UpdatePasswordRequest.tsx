import { AxiosError, AxiosResponse } from "axios";
import { appAxios, withAuthorizationHeader } from "../../../app-axios";
import StatusCode from "status-code-enum";

/** DTO for the password change request */
export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/** Error result of the update password request */
export enum EUpdatePasswordResult {
  /** Success */
  OK = "ok",

  /** The request was not authorized - possibly a bad token */
  Unauthorized = "unauthorized",

  /** Some generic error */
  InternalError = "error",
}

//! Performs the login request & invokes callback upon result
export const UpdatePasswordRequest = (
  token: string,
  req: IUpdatePasswordRequest,
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
    .post("password-update", req, {
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
