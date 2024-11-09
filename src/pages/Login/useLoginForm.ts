import { validate as validateEmail } from "email-validator";
import { FormEvent, useState } from "react";

/**
 * The stata variables of the login form
 */
export class CLoginFormState {
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

    setState((prevState) => ({
      ...prevState,
      emailError: mailErr,
      passwordError: passErr,
    }));

    // Do Submit
    // TODO
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
