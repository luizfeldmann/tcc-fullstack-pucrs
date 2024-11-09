import { useEffect, useState } from "react";
import { appAxios } from "../../app-axios";
import { AxiosError, AxiosResponse } from "axios";
import StatusCode from "status-code-enum";

export enum EVerifyAccountStateIndicator {
  UnknownError,
  Loading,
  Success,
  AccountNotExist,
  InvalidToken,
}

export const useVerifyAccountIndicator = (token: string) => {
  const [state, setState] = useState(EVerifyAccountStateIndicator.Loading);

  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
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
  };

  useEffect(() => {
    setState(EVerifyAccountStateIndicator.Loading);
    appAxios
      .post("verify", {
        token: token,
      })
      .then((resp) => {
        onAxiosResponse(resp);
      })
      .catch((error: AxiosError) => {
        onAxiosResponse(error.response);
      });
  }, [token]);

  return state;
};
