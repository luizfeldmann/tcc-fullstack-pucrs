import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import zod from "zod";
import {
  EResetPasswordResult,
  ResetPasswordRequest,
} from "./ResetPasswordRequest";
import { useI18nContext } from "../../localization/i18n-react";
import { TranslationFunctions } from "../../localization/i18n-types";

/** Validation of the fields for requesting a password reset */
const resetPasswordFormSchemaFromLocale = (LL: TranslationFunctions) => {
  return zod.object({
    emailAddress: zod
      .string()
      .min(1, LL.ResetPassword.Form.EmailRequired())
      .email(LL.ResetPassword.Form.EmailInvalid()),
  });
};

/** Intermediate states of the reset form */
export enum EPasswordResetFormStages {
  initial = "initial",
  loading = "loading",
}

/** Total state of the form - both intermedate and final results */
export type EPasswordResetFormState =
  | EPasswordResetFormStages
  | EResetPasswordResult;

/** Hook implementing the logic of the password-reset-request form */
export const usePasswordResetForm = () => {
  /** Localization of the form schema */
  const { LL } = useI18nContext();

  /** Validation of the fields for requesting a password reset */
  const resetPasswordFormSchema = useMemo(() => {
    return resetPasswordFormSchemaFromLocale(LL);
  }, [LL]);

  type resetPasswordFormData = zod.infer<typeof resetPasswordFormSchema>;

  /** Form logic */
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<resetPasswordFormData>({
    mode: "all",
    resolver: zodResolver(resetPasswordFormSchema),
  });

  /** Represents the state of this form */
  interface State {
    state: EPasswordResetFormState;
    captcha?: string;
  }

  const [state, setState] = useState<State>({
    state: EPasswordResetFormStages.initial,
    captcha: undefined,
  });

  /** Callback invoked when the password reset request gets a response */
  const onResult = (result: EResetPasswordResult) => {
    if (result === EResetPasswordResult.BadUser) {
      control.setError("emailAddress", {
        type: "custom",
        message: LL.ResetPassword.Status.BadUser(),
      });
    }

    /** Set the resulting state to the UI */
    setState((prevState) => ({
      ...prevState,
      state: result,
    }));
  };

  /** Invoked when the user submits a valid form asking to reset the password */
  const onSubmit = (data: resetPasswordFormData) => {
    // Mark the form as in-progress
    setState((prevState) => ({
      ...prevState,
      state: EPasswordResetFormStages.loading,
    }));
    // Send the request
    ResetPasswordRequest(
      {
        emailAddress: data.emailAddress,
      },
      onResult
    );
  };

  /** Invoked when the captcha is completed or expires */
  const onCaptcha = (token: string | null) => {
    setState((prevState) => ({
      ...prevState,
      captcha: token || undefined,
    }));
  };

  const onSubmitHandler = handleSubmit(onSubmit);
  const disableSubmit =
    !isValid ||
    state.captcha === null ||
    state.state == EPasswordResetFormStages.loading;

  return {
    control,
    errors,
    disableSubmit,
    state: state.state,
    onCaptcha,
    onSubmitHandler,
  };
};
