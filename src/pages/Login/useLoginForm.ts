import { validate as validateEmail } from "email-validator";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ELoginError,
  ELoginSuccess,
  ILoginResult,
  LoginRequest,
} from "./LoginRequest";
import { ERoutes } from "../../routes";
import { useI18nContext } from "../../localization/i18n-react";

/**
 * The stata variables of the login form
 */
export class CLoginFormState {
  //! Indicates the form is loading
  loading: boolean = false;
  //! Indicates that the password will be visible in plain text
  showPassword: boolean = false;
  //! An error in validation of the e-mail
  emailError?: string;
  //! An error in validation of the password
  passwordError?: string;
}

/** Parameters passed to construct the login form */
export interface IUseLoginParams {
  /** The page where to redirect after the login is completed */
  redirectAfterLogin?: string;

  /** Callback for when the login is done */
  onLogin: (token: string) => void;
}

/**
 * Hook for the log-in form logic
 */
export const useLoginForm = (params: IUseLoginParams) => {
  const { LL } = useI18nContext();

  /** State of the form */
  const [state, setState] = useState<CLoginFormState>(new CLoginFormState());
  const navigate = useNavigate();

  /** Called when the user clicks the eye icon to show/hide the password mask */
  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  /** Called when the user submits the login form */
  const handleOnSubmit = (formEvent: FormEvent) => {
    formEvent.preventDefault();

    // Read form values
    const target = formEvent.target as typeof formEvent.target & {
      email: { value: string };
      password: { value: string };
    };

    // Validation
    let passErr: string | undefined = undefined;
    let mailErr: string | undefined = undefined;

    const mailValue = target.email.value;
    const passValue = target.password.value;

    if (!mailValue) mailErr = LL.Login.Form.EmailRequired();
    else if (!validateEmail(mailValue)) mailErr = LL.Login.Form.EmailInvalid();

    if (!passValue) passErr = LL.Login.Form.PasswordRequired();

    // Callback when the log-in succeeds and a token is provided
    const OnLoginSuccess = (token: string) => {
      // Hoist the token information to the top level
      params.onLogin(token);

      // Navigate to the root of the website, this time while logged in
      navigate(params.redirectAfterLogin || ERoutes.Index);
    };

    // Callback invoked when the server responds from the login request
    const OnLoginResult = (result: ILoginResult) => {
      switch (result.status) {
        default:
        case ELoginError.InternalError:
          setState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          break;

        case ELoginError.BadUser:
          setState((prevState) => ({
            ...prevState,
            loading: false,
            emailError: LL.Login.Status.BadUser(),
          }));
          break;

        case ELoginError.BadPass:
          setState((prevState) => ({
            ...prevState,
            loading: false,
            passwordError: LL.Login.Status.BadPass(),
          }));
          break;

        case ELoginSuccess.OK:
          setState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          OnLoginSuccess(result.token);
          break;
      }
    };

    // Do submit the login request
    const doSubmit = !passErr && !passErr;

    if (doSubmit) {
      LoginRequest(
        {
          emailAddress: mailValue,
          password: passValue,
        },
        OnLoginResult
      );
    }

    // Update the form's state
    setState((prevState) => ({
      ...prevState,
      loading: doSubmit,
      emailError: mailErr,
      passwordError: passErr,
    }));
  };

  const getErrorAttributtes = (message?: string) => {
    return {
      error: Boolean(message),
      helperText: message,
    };
  };

  return {
    state,
    handleClickShowPassword,
    handleOnSubmit,
    getErrorAttributtes,
  };
};
