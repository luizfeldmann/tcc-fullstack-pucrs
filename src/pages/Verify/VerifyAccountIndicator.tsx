import { ErrorOutline, Check, SearchOff, Block } from "@mui/icons-material";
import {
  EVerifyAccountStateIndicator,
  useVerifyAccountIndicator,
} from "./useVerifyAccountIndicator";
import { CircularProgress } from "@mui/material";

/** Parameters passed to the verification state component */
export interface IVerifyAccountIndicatorParams {
  /** JWT token used for the verification */
  token: string;
}

/** Describes the UI information presented for one verificatio state */
interface IVerifyAccountIndication {
  /** Text presented to the user */
  text: string;
  /** Associated icon presented */
  icon: React.ElementType;
}

/** Matches each of the verificatio state codes to a UI indication */
type IndicationDictionary = {
  [K in EVerifyAccountStateIndicator]: IVerifyAccountIndication;
};

/** Mapping between verificatio states and the corresponding indication in the UI  */
const verifyAccountIndications: IndicationDictionary = {
  [EVerifyAccountStateIndicator.UnknownError]: {
    text: "Unknown error",
    icon: ErrorOutline,
  },
  [EVerifyAccountStateIndicator.Loading]: {
    text: "Please wait while your account is verified",
    icon: CircularProgress,
  },
  [EVerifyAccountStateIndicator.Success]: {
    text: "Your account was verified successfully",
    icon: Check,
  },
  [EVerifyAccountStateIndicator.AccountNotExist]: {
    text: "No such account",
    icon: SearchOff,
  },
  [EVerifyAccountStateIndicator.InvalidToken]: {
    text: "The verification token is invalid",
    icon: Block,
  },
};

/** Uses a token to verify a user and indicates the resulting state */
const VerifyAccountIndicator = (params: IVerifyAccountIndicatorParams) => {
  const state = useVerifyAccountIndicator(params.token);
  const indication = verifyAccountIndications[state];
  const IndicationIcon = indication.icon;

  return (
    <div>
      <IndicationIcon />
      <span>{indication.text}</span>
    </div>
  );
};

export default VerifyAccountIndicator;
