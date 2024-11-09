import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod, { ZodIssueCode } from "zod";
import { SignupRequest, SignupResult } from "./SignupRequest";
import bcrypt from "bcryptjs";

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 16;

/** Password validation requirements */
const passwordSchema = zod
  .string()
  .min(
    MIN_PASSWORD_LEN,
    `Length must be at least ${MIN_PASSWORD_LEN} characters`
  )
  .max(
    MAX_PASSWORD_LEN,
    `Length must be at most ${MAX_PASSWORD_LEN} characters`
  )
  .superRefine((password, context) => {
    if (!/[a-z]/.test(password))
      context.addIssue({
        code: ZodIssueCode.custom,
        message: "Must contain a lower case letter",
      });
    if (!/[A-Z]/.test(password))
      context.addIssue({
        code: ZodIssueCode.custom,
        message: "Must contain an upper case letter",
      });
    if (!/[0-9]/.test(password))
      context.addIssue({
        code: ZodIssueCode.custom,
        message: "Must contain a number",
      });
  });

/** Full signup form validation schema */
const signupFormSchema = zod
  .object({
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().min(1, "Last name is required"),
    emailAddress: zod
      .string()
      .min(1, "Address is required")
      .email("Invalid e-mail"),
    password: passwordSchema,
    confirmPassword: zod.string().min(1, "Password confirmation is required"),
  })
  .superRefine((values, context) => {
    if (values.password !== values.confirmPassword) {
      context.addIssue({
        code: ZodIssueCode.custom,
        message: "The password confirmation does not match",
        path: ["confirmPassword"],
      });
    }
  });

type signupFormData = zod.infer<typeof signupFormSchema>;

/** Intermediate states of the signup form (no success or error is determined) */
export enum SignupFormSubmitPartialState {
  Initial = "initial",
  Loading = "loading",
}

/** Any state of the form: both success/error states & intermediate states */
export type SignupFormSubmitState = SignupResult | SignupFormSubmitPartialState;

const salt = await bcrypt.genSaltSync(10);

/** Hook with logic for the signup form */
export const useSignupForm = () => {
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
      console.log("Alredy exists error");
      control.setError("emailAddress", {
        type: "custom",
        message: "User already registered",
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
        passwordHashed: bcrypt.hashSync(data.password, salt),
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
