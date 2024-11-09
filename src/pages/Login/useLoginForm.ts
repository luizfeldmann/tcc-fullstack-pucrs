import { validate as validateEmail } from "email-validator";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ELoginError,
  ELoginSuccess,
  ILoginResult,
  LoginRequest,
} from "./LoginRequest";

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

/**
 * Hook for the log-in form logic
 */
export const useLoginForm = () => {
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

    if (!mailValue) mailErr = "Address is required";
    else if (!validateEmail(mailValue))
      mailErr = "The e-mail address is invalid";

    if (!passValue) passErr = "Password is required";

    // Callback when the log-in succeeds and a token is provided
    const OnLoginSuccess = (token: string) => {
      // TODO: save the authentication token in the session
      // Navigate to the root of the website, this time while logged in
      navigate("/");
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
            emailError: "User does not exist",
          }));
          break;

        case ELoginError.BadPass:
          setState((prevState) => ({
            ...prevState,
            loading: false,
            passwordError: "Incorrect password",
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
