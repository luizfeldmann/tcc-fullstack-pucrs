import { IVerifyAccountRequestData } from "@/lib/schemas/dto/VerifyAccountRequest";
import { appAxios } from "@/lib/singleton/app-axios";
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import StatusCode from "status-code-enum";

/** States for the indicator */
export enum EVerifyAccountStateIndicator {
  UnknownError,

  /** The verification is loading */
  Loading,

  /** The verification was successful */
  Success,

  /** The user account does not exist */
  AccountNotExist,

  /** The token is invalid or expired */
  InvalidToken,
}

export const useVerifyAccountIndicator = (token: string) => {
  // Start with the loading state
  const [state, setState] = useState(EVerifyAccountStateIndicator.Loading);

  const onAxiosResponse = useCallback(
    (resp?: AxiosResponse) => {
      switch (resp?.status) {
        default:
          setState(EVerifyAccountStateIndicator.UnknownError);
          break;
        case StatusCode.SuccessOK:
          setState(EVerifyAccountStateIndicator.Success);
          break;
        case StatusCode.ClientErrorNotFound:
          setState(EVerifyAccountStateIndicator.AccountNotExist);
          break;
        case StatusCode.ClientErrorUnauthorized:
          setState(EVerifyAccountStateIndicator.InvalidToken);
          break;
      }
    },
    [setState]
  );

  // Perform request to check the verification
  useEffect(() => {
    appAxios
      .post("verify", {
        token: token,
      } satisfies IVerifyAccountRequestData)
      .then((resp) => {
        onAxiosResponse(resp);
      })
      .catch((error: AxiosError) => {
        onAxiosResponse(error.response);
      });
  }, [token, onAxiosResponse]);

  // Return the verification state
  return state;
};
