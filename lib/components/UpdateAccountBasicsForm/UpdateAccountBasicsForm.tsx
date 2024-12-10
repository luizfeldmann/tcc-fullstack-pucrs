"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { TranslationFunctions } from "@/lib/localization/i18n-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthContext } from "../Providers/AuthProvider";
import { useAccountInfoQuery } from "@/lib/hooks/useAccountInfoQuery";
import { IUserAccountInfoResponseData } from "@/lib/schemas/dto/UserAccountInfoResponse";
import { useAccountInfoMutation } from "@/lib/hooks/useAccountInfoMutation";
import { IUserAccountBasicInfoUpdateRequestData } from "@/lib/schemas/dto/UserAccountInfoUpdateRequest";
import {
  Alert,
  Button,
  CircularProgress,
  Skeleton,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { EditNote } from "@mui/icons-material";

/** Creates the form schema with localized warnings */
const userBasicsFormSchemaFromLocale = (LL: TranslationFunctions) => {
  return z.object({
    firstName: z.string().min(1, LL.Signup.Form.FirstNameRequired()),
    lastName: z.string().min(1, LL.Signup.Form.LastNameRequired()),
  });
};

const TextFieldOrSkeleton = (props: { skeleton: boolean } & TextFieldProps) => {
  const { skeleton, ...textFieldProps } = props;
  return skeleton ? <Skeleton /> : <TextField {...textFieldProps} />;
};

/** Allows user to edit basic account information */
export const UpdateAccountBasicsForm = () => {
  // Localization texts
  const { LL } = useI18nContext();

  const formSchema = useMemo(() => {
    return userBasicsFormSchemaFromLocale(LL);
  }, [LL]);

  type formData = z.infer<typeof formSchema>;

  // Use the react-hook-form to control the form data
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<formData>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  /** Callback when the query reads fresh data */
  const onNewData = useCallback(
    (data: IUserAccountInfoResponseData) => {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      return data;
    },
    [setValue]
  );

  // Use authentication
  const authContext = useAuthContext();

  // Query and mutate the user info
  const userInfoQuery = useAccountInfoQuery(
    authContext?.token ?? "",
    onNewData
  );

  const userInfoMutate = useAccountInfoMutation(authContext?.token ?? "");

  /** Callback for when the user clicks the submit button */
  const onSubmit = useCallback(
    (data: IUserAccountBasicInfoUpdateRequestData) => {
      userInfoMutate.mutate(data);
    },
    [userInfoMutate]
  );

  // Show error if unable to save user data
  if (userInfoMutate.isError)
    return <Alert severity="error">{userInfoMutate.error.message}</Alert>;

  // Show error if unable to read user data
  if (userInfoQuery.isError)
    return <Alert severity="error">{userInfoQuery.error.message}</Alert>;

  // Show the actual form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextFieldOrSkeleton
              skeleton={userInfoQuery.isLoading}
              label={LL.Signup.Form.FirstName()}
              disabled={userInfoMutate.isPending}
              helperText={errors.firstName?.message}
              error={errors.firstName !== undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextFieldOrSkeleton
              skeleton={userInfoQuery.isLoading}
              label={LL.Signup.Form.LastName()}
              disabled={userInfoMutate.isPending}
              helperText={errors.lastName?.message}
              error={errors.lastName !== undefined}
              {...field}
            />
          )}
        />
        <Typography align="center">
          <Button
            variant="contained"
            type="submit"
            startIcon={
              userInfoMutate.isPending || userInfoQuery.isLoading ? (
                <CircularProgress />
              ) : (
                <EditNote />
              )
            }
            disabled={
              !isValid || userInfoMutate.isPending || userInfoQuery.isLoading
            }
          >
            {LL.Account.BasicInfoTab.UpdateInfoForm.SubmitButton()}
          </Button>
        </Typography>
      </Stack>
    </form>
  );
};
