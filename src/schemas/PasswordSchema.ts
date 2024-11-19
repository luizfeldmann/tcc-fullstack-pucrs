import zod, { ZodIssueCode } from "zod";
import { TranslationFunctions } from "../localization/i18n-types";

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 16;

/** Password validation requirements */
export function passwordSchema(LL: TranslationFunctions) {
  return zod
    .string()
    .min(MIN_PASSWORD_LEN, LL.PasswordRequirements.MinLen(MIN_PASSWORD_LEN))
    .max(MAX_PASSWORD_LEN, LL.PasswordRequirements.MaxLen(MAX_PASSWORD_LEN))
    .superRefine((password, context) => {
      if (!/[a-z]/.test(password))
        context.addIssue({
          code: ZodIssueCode.custom,
          message: LL.PasswordRequirements.LowerCase(),
        });
      if (!/[A-Z]/.test(password))
        context.addIssue({
          code: ZodIssueCode.custom,
          message: LL.PasswordRequirements.UpperCase(),
        });
      if (!/[0-9]/.test(password))
        context.addIssue({
          code: ZodIssueCode.custom,
          message: LL.PasswordRequirements.Number(),
        });
    });
}

export interface IPasswordConfirmationRefine {
  password: string;
  confirmPassword: string;
}

/** Checker for password confirmation matching the password */
export function passwordConfirmationMatchRefinement(LL: TranslationFunctions) {
  return (values: IPasswordConfirmationRefine, context: Zod.RefinementCtx) => {
    if (values.password !== values.confirmPassword) {
      context.addIssue({
        code: ZodIssueCode.custom,
        message: LL.PasswordRequirements.Confirmation(),
        path: ["confirmPassword"],
      });
    }
  };
}
