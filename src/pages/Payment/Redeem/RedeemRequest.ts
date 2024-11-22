import { AxiosError, AxiosResponse } from "axios";
import StatusCode from "status-code-enum";
import { appAxios, withAuthorizationHeader } from "../../../app-axios";

export enum ERedeemResult {
  /** The reset request was successful */
  OK = "ok",

  /** The code does not exist */
  BadCode = "bad-code",

  /** The code has expired or was already used */
  ExpiredCode = "expired-code",

  /** Some generic error */
  InternalError = "error",
}

/** DTO for the redeem request */
export interface IRedeemRequest {
  redeemCode: string;
}

/** Requests the server to issue a password reset link */
export const RedeemRequest = (
  token: string,
  req: IRedeemRequest,
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

  appAxios
    .post("redeem", req, {
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
