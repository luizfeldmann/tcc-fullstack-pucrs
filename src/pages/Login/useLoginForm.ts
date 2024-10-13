import { validate as validateEmail } from "email-validator";
import { FormEvent, useState } from "react";

export class CLoginFormState {
    showPassword: boolean = false;
    emailError?: string;
    passwordError?: string;
}

export const useLoginForm = () => {
    const [state, setState] = useState<CLoginFormState>(new CLoginFormState());
  
    const handleClickShowPassword = () => {
      setState({
        ...state,
        showPassword: !state.showPassword,
      });
    };
  
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