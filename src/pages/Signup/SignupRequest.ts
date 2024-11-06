import StatusCode from "status-code-enum";
import { appAxios } from "../../app-axios";
import { AxiosError, AxiosResponse } from "axios";

export class SignupRequestData {
  firstName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  passwordHashed: string = "";
}

export enum SignupResult {
  Created = "created",
  AlreadyExists = "exists",
  InternalError = "error",
}

export const SignupRequest = (
  req: SignupRequestData,
  onResponse: (result: SignupResult) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    if (resp?.status === StatusCode.SuccessCreated) {
      onResponse(SignupResult.Created);
    } else if (resp?.status === StatusCode.ClientErrorConflict) {
      onResponse(SignupResult.AlreadyExists);
    } else {
      onResponse(SignupResult.InternalError);
    }
  };

  appAxios
    .post("signup", req)
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};
