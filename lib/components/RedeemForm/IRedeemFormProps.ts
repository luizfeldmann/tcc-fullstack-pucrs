import { ButtonProps } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";

/** Fields contained in the redeem form */
export interface IRedeemFormFields {
  redeemCode: string;
}

/** State of the redeem code form */
export interface IRedeemFormProps {
  /** Hook controller for the form fields */
  control: Control<IRedeemFormFields>;

  /** Validation errors */
  errors: FieldErrors<IRedeemFormFields>;

  /** A success message that replaces the form */
  success?: string;

  /** Indicates the request is loading */
  loading: boolean;

  /** Callback to clear and reset the form */
  onClear: () => void;

  /** Properties of the submit button */
  submit: ButtonProps;
}
