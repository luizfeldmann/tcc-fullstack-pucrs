import zod, { ZodIssueCode } from "zod";

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 16;

/** Password validation requirements */
export const passwordSchema = zod
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

interface IPasswordConfirmationRefine {
  password: string;
  confirmPassword: string;
}

export const passwordConfirmationMatchRefinement = (
  values: IPasswordConfirmationRefine,
  context: Zod.RefinementCtx
) => {
  if (values.password !== values.confirmPassword) {
    context.addIssue({
      code: ZodIssueCode.custom,
      message: "The password confirmation does not match",
      path: ["confirmPassword"],
    });
  }
};
