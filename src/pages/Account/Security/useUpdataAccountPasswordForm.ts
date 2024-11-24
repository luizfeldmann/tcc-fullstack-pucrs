import { z } from "zod";
import { TranslationFunctions } from "../../../localization/i18n-types";
import {
  passwordConfirmationMatchRefinement,
  passwordSchema,
} from "../../../schemas/PasswordSchema";
import { useI18nContext } from "../../../localization/i18n-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../../hooks/useAuth";
import {
  EUpdatePasswordResult,
  UpdatePasswordRequest,
} from "./UpdatePasswordRequest";

/** Schema for changing the known password to a new one */
const updatePasswordFormSchema = (LL: TranslationFunctions) => {
  return z
    .object({
      oldPassword: passwordSchema(LL),
      password: passwordSchema(LL),
      confirmPassword: z.string().min(1, LL.PasswordRequirements.Required()),
    })
    .superRefine(passwordConfirmationMatchRefinement(LL));
};

/** Intermediate states for the form */
enum EUpdatePasswordFormIntermediate {
  Initial = "initial",
  Loading = "loading",
}

/** Total state of the form */
type EUpdatePasswordFormState =
  | EUpdatePasswordFormIntermediate
  | EUpdatePasswordResult;

/** Logic for updating the password when the user still knows the old password */
export const useUpdateAccountPasswordForm = () => {
  /** Get authentication */
  const token = useAuthContext();

  /** Localization for the form validation warnings */
  const { LL } = useI18nContext();

  const formSchema = useMemo(() => {
    return updatePasswordFormSchema(LL);
  }, [LL]);

  type formData = z.infer<typeof formSchema>;

  // Use the react-hook-form
  const {
    control,
    reset: resetForm,
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<formData>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  /** State of the form */
  const [state, setState] = useState<EUpdatePasswordFormState>(
    EUpdatePasswordFormIntermediate.Initial
  );

  /** Callback to go back to initial state */
  const handleResetForm = () => {
    setState(EUpdatePasswordFormIntermediate.Initial);
    resetForm();
  };

  /** Callback when the user clicks to submit the form */
  const onSubmit = (data: formData) => {
    // Set as loading
    setState(EUpdatePasswordFormIntermediate.Loading);
    // Perform the request
    UpdatePasswordRequest(
      token!,
      {
        oldPassword: data.oldPassword,
        newPassword: data.password,
      },
      (result) => {
        // Update form state according to result
        setState(result);
        // Update the error messages
        switch (result) {
          case EUpdatePasswordResult.Unauthorized:
            setError("oldPassword", {
              type: "custom",
              message: LL.Login.Status.BadPass(),
            });
            break;
        }
      }
    );
  };

  return {
    isSuccess: state === EUpdatePasswordResult.OK,
    isLoading: state === EUpdatePasswordFormIntermediate.Loading,
    disableSubmit: !isValid || state == EUpdatePasswordFormIntermediate.Loading,
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    handleResetForm,
  };
};
