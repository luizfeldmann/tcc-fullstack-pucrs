import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { SignupRequest, SignupResult } from "./SignupRequest";
import {
  passwordConfirmationMatchRefinement,
  passwordSchema,
} from "../../schemas/PasswordSchema";
import { useI18nContext } from "../../localization/i18n-react";
import { TranslationFunctions } from "../../localization/i18n-types";

/** Full signup form validation schema with localized warnings */
const signupFormSchemaFromLocale = (LL: TranslationFunctions) => {
  return zod
    .object({
      firstName: zod.string().min(1, LL.Signup.Form.FirstNameRequired()),
      lastName: zod.string().min(1, LL.Signup.Form.LastNameRequired()),
      emailAddress: zod
        .string()
        .min(1, LL.Signup.Form.EmailRequired())
        .email(LL.Signup.Form.EmailRequired()),
      password: passwordSchema(LL),
      confirmPassword: zod
        .string()
        .min(1, LL.Signup.Form.PasswordConfirmationRequired()),
    })
    .superRefine(passwordConfirmationMatchRefinement(LL));
};

/** Intermediate states of the signup form (no success or error is determined) */
export enum SignupFormSubmitPartialState {
  Initial = "initial",
  Loading = "loading",
}

/** Any state of the form: both success/error states & intermediate states */
export type SignupFormSubmitState = SignupResult | SignupFormSubmitPartialState;

/** Hook with logic for the signup form */
export const useSignupForm = () => {
  /** Localization texts */
  const { LL } = useI18nContext();

  const signupFormSchema = useMemo(() => {
    return signupFormSchemaFromLocale(LL);
  }, [LL]);

  type signupFormData = zod.infer<typeof signupFormSchema>;

  /** Form logic */
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<signupFormData>({
    mode: "all",
    resolver: zodResolver(signupFormSchema),
  });

  const [submitState, setSubmitState] = useState<SignupFormSubmitState>(
    SignupFormSubmitPartialState.Initial
  );

  /** Invoked after the server responds with a status */
  const onSubmitResult = (result: SignupResult) => {
    if (result === SignupResult.AlreadyExists) {
      control.setError("emailAddress", {
        type: "custom",
        message: LL.Signup.Status.AlreadyExists(),
      });
    }

    setSubmitState(result);
  };

  /** User clicked submit on a validly filled form */
  const onSubmit = (data: signupFormData) => {
    // Set the form in intermediate loading state
    setSubmitState(SignupFormSubmitPartialState.Loading);

    // Request the creation to the server
    SignupRequest(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        password: data.password,
      },
      onSubmitResult
    );
  };

  /** State of the captcha check */
  const [checkedCaptcha, setCheckedCaptcha] = useState<string | null>(null);

  const onCaptcha = (token: string | null) => {
    setCheckedCaptcha(token);
  };

  const onSubmitHandler = handleSubmit(onSubmit);

  /** Decides when the Submit button is clickable */
  const disableSubmit =
    !isValid || // Disable submit if form has errors
    checkedCaptcha === null || // Disable if not solved the captcha
    submitState == SignupFormSubmitPartialState.Loading; // Disable clicking again while it loads

  return {
    control,
    errors,
    disableSubmit,
    onCaptcha,
    onSubmitHandler,
    submitState,
  };
};
