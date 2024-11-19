import { Control, FieldErrors } from "react-hook-form";

/** Fields contained in the redeem form */
export interface IRedeemFormFields {
  redeemCode: string;
}

/** State of the redeem code form */
export interface IRedeemFormState {
  /** Hook controller for the form fields */
  control: Control<IRedeemFormFields>;

  /** Validation errors */
  errors: FieldErrors<IRedeemFormFields>;

  /** A success message that replaces the form */
  success?: string;

  /** Indicates the form cannot yet be submitted */
  disableSubmit: boolean;

  /** Indicates the request is loading */
  loading: boolean;

  /** Handler callback for the submit button click */
  onSubmit: () => void;

  /** Callback to clear and reset the form */
  onClear: () => void;
}
