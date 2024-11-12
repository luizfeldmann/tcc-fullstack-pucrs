import zod from "zod";
import {
  passwordConfirmationMatchRefinement,
  passwordSchema,
} from "../../components/PasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  ChangePasswordRequest,
  EChangePasswordResult,
} from "./ChangePasswordRequest";

/** Full signup form validation schema */
const changePasswordFormSchema = zod
  .object({
    password: passwordSchema,
    confirmPassword: zod.string().min(1, "Password confirmation is required"),
  })
  .superRefine(passwordConfirmationMatchRefinement);

type changePasswordFormData = zod.infer<typeof changePasswordFormSchema>;

/** Intermediate states for the form */
export enum EChangePasswordFormIntermediate {
  Initial = "initial",
  Loading = "loading",
}

/** Total state of the password changing form */
export type EChangePasswordFormState =
  | EChangePasswordFormIntermediate
  | EChangePasswordResult;

/** Hook with logic for new password form */
export const useChangePasswordForm = (token: string) => {
  // Use the react-hook-form
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<changePasswordFormData>({
    mode: "all",
    resolver: zodResolver(changePasswordFormSchema),
  });

  // State of the execution
  const [state, setState] = useState<EChangePasswordFormState>(
    EChangePasswordFormIntermediate.Initial
  );

  /** Callback after the response returns */
  const onResult = (result: EChangePasswordResult) => {
    setState(result);
  };

  /** Callback when the user clicks to submit the form */
  const onSubmit = (data: changePasswordFormData) => {
    // Make the form disabled
    setState(EChangePasswordFormIntermediate.Loading);
    // Send the request
    ChangePasswordRequest(
      {
        token: token,
        password: data.password,
      },
      onResult
    );
  };

  const onSubmitHandler = handleSubmit(onSubmit);

  /** Decides when the Submit button is clickable */
  const disableSubmit =
    !isValid || state === EChangePasswordFormIntermediate.Loading;

  return {
    control,
    errors,
    disableSubmit,
    state,
    onSubmitHandler,
  };
};
