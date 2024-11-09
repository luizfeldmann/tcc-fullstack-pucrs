import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import zod from "zod";

/** Validation of the fields for requesting a password reset */
const resetPasswordFormSchema = zod.object({
  emailAddress: zod
    .string()
    .min(1, "Address is required")
    .email("Invalid e-mail"),
});
type resetPasswordFormData = zod.infer<typeof resetPasswordFormSchema>;

/** Hook implementing the logic of the password-reset-request form */
export const usePasswordResetForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<resetPasswordFormData>({
    mode: "all",
    resolver: zodResolver(resetPasswordFormSchema),
  });

  /** Invoked when the user submits a valid form asking to reset the password */
  const onSubmit = (data: resetPasswordFormData) => {};

  const [checkedCaptcha, setCheckedCaptcha] = useState<string | null>(null);

  const onCaptcha = (token: string | null) => {
    setCheckedCaptcha(token);
  };

  const onSubmitHandler = handleSubmit(onSubmit);
  const disableSubmit = !isValid || checkedCaptcha === null;

  return { control, errors, disableSubmit, onCaptcha, onSubmitHandler };
};
