import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import zod from "zod";

const resetPasswordFormSchema = zod.object({
    emailAddress: zod
      .string()
      .min(1, "Address is required")
      .email("Invalid e-mail"),
  });
  type resetPasswordFormData = zod.infer<typeof resetPasswordFormSchema>;

  export const usePasswordResetForm = () => {
    const {
      control,
      handleSubmit,
      formState: { isValid, errors },
    } = useForm<resetPasswordFormData>({
      mode: "all",
      resolver: zodResolver(resetPasswordFormSchema),
    });

    const onSubmit = (data: resetPasswordFormData) => {};

    const [checkedCaptcha, setCheckedCaptcha] = useState<string | null>(null);

    const onCaptcha = (token: string | null) => {
      setCheckedCaptcha(token);
    };

    const onSubmitHandler = handleSubmit(onSubmit);
    const disableSubmit = !isValid || checkedCaptcha === null;

    return { control, errors, disableSubmit, onCaptcha, onSubmitHandler };
};
