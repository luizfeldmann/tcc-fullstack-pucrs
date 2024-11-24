import {
  Alert,
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  IUserAccountInfoMutation,
  IUserInfo,
  useAccountInfoMutation,
  useAccountInfoQuery,
} from "../../../hooks/useAccountInfo";
import { useAuthContext } from "../../../hooks/useAuth";
import { useI18nContext } from "../../../localization/i18n-react";
import { Controller, useForm } from "react-hook-form";
import { EditNote } from "@mui/icons-material";
import { TranslationFunctions } from "../../../localization/i18n-types";
import { z } from "zod";
import { useCallback, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

/** Creates the form schema with localized warnings */
const userBasicsFormSchemaFromLocale = (LL: TranslationFunctions) => {
  return z.object({
    firstName: z.string().min(1, LL.Signup.Form.FirstNameRequired()),
    lastName: z.string().min(1, LL.Signup.Form.LastNameRequired()),
  });
};

/** Allows user to edit basic account information */
const UpdateAccountBasicsForm = () => {
  /** Localization texts */
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
  });

  /** Callback when the query reads fresh data */
  const onNewData = useCallback(
    (data: IUserInfo) => {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      return data;
    },
    [setValue]
  );

  // Use authentication
  const token = useAuthContext();

  // Query and mutate the user info
  const userInfoQuery = useAccountInfoQuery(token!, onNewData);
  const userInfoMutate = useAccountInfoMutation(token!);

  /** Callback for when the user clicks the submit button */
  const onSubmit = useCallback(
    (data: IUserAccountInfoMutation) => {
      userInfoMutate.mutate(data);
    },
    [userInfoMutate]
  );

  // Show a progress while the query or mutation happen
  if (userInfoQuery.isLoading || userInfoMutate.isPending)
    return <LinearProgress />;

  // Show error if unable to save user data
  if (userInfoMutate.isError)
    return <Alert severity="error">{userInfoMutate.error.message}</Alert>;

  // Show error if unable to read user data
  if (userInfoQuery.isError)
    return <Alert severity="error">{userInfoQuery.error.message}</Alert>;

  // Show the actual form
  if (userInfoQuery.isSuccess) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                label={LL.Signup.Form.FirstName()}
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
              <TextField
                label={LL.Signup.Form.LastName()}
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
              startIcon={<EditNote />}
              disabled={!isValid}
            >
              {LL.Account.BasicInfoTab.UpdateInfoForm.SubmitButton()}
            </Button>
          </Typography>
        </Stack>
      </form>
    );
  }

  // Unreachable ?
  return <></>;
};

export default UpdateAccountBasicsForm;
