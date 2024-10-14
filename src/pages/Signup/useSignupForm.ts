import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod, { ZodIssueCode } from "zod";

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 16;

const passwordSchema = zod.string()
    .min(MIN_PASSWORD_LEN, `Length must be at least ${MIN_PASSWORD_LEN} characters`)
    .max(MAX_PASSWORD_LEN, `Length must be at most ${MAX_PASSWORD_LEN} characters`)
    .superRefine((password, context)=>{
        if (!/[a-z]/.test(password))
            context.addIssue({code: ZodIssueCode.custom, message: "Must contain a lower case letter"})
        if (!/[A-Z]/.test(password))
            context.addIssue({code: ZodIssueCode.custom, message: "Must contain an upper case letter"})
        if (!/[0-9]/.test(password))
            context.addIssue({code: ZodIssueCode.custom, message: "Must contain a number"})
});

const signupFormSchema = zod.object({
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().min(1, "Last name is required"),
    emailAddress: zod
      .string()
      .min(1, "Address is required")
      .email("Invalid e-mail"),
    password: passwordSchema,
    confirmPassword: zod.string().min(1, "Password confirmation is required")
  }).superRefine((values, context)=> {
    if (values.password !== values.confirmPassword)
    {
        context.addIssue({
            code: ZodIssueCode.custom,
            message: "The password confirmation does not match",
            path: ["confirmPassword"]
        });
    }
  });

type signupFormData = zod.infer<typeof signupFormSchema>;

export const useSignupForm = () => {
    const {
      control,
      handleSubmit,
      formState: { isValid, errors },
    } = useForm<signupFormData>({
      mode: "all",
      resolver: zodResolver(signupFormSchema),
    });

    const onSubmit = (data: signupFormData) => {};

    const [checkedCaptcha, setCheckedCaptcha] = useState<string | null>(null);

    const onCaptcha = (token: string | null) => {
      setCheckedCaptcha(token);
    };

    const onSubmitHandler = handleSubmit(onSubmit);
    const disableSubmit = !isValid || checkedCaptcha === null;

    return { control, errors, disableSubmit, onCaptcha, onSubmitHandler };
};
