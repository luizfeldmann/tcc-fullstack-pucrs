import { ErrorOutline, Check, SearchOff, Block } from "@mui/icons-material";
import {
  EVerifyAccountStateIndicator,
  useVerifyAccountIndicator,
} from "./useVerifyAccountIndicator";
import { Button, CircularProgress, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { ERoutes } from "../../routes";
import { useI18nContext } from "../../localization/i18n-react";
import { TranslationFunctions } from "../../localization/i18n-types";
import { useMemo } from "react";

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

/** Mapping between verification states and the corresponding indication in the UI  */
const verifyAccountIndicationsFromLocale = (LL: TranslationFunctions) => {
  return {
    [EVerifyAccountStateIndicator.UnknownError]: {
      text: LL.Verify.Status.UnknownError(),
      icon: ErrorOutline,
    },
    [EVerifyAccountStateIndicator.Loading]: {
      text: LL.Verify.Status.Loading(),
      icon: CircularProgress,
    },
    [EVerifyAccountStateIndicator.Success]: {
      text: LL.Verify.Status.Verified(),
      icon: Check,
    },
    [EVerifyAccountStateIndicator.AccountNotExist]: {
      text: LL.Verify.Status.NotExist(),
      icon: SearchOff,
    },
    [EVerifyAccountStateIndicator.InvalidToken]: {
      text: LL.Verify.Status.Invalid(),
      icon: Block,
    },
  } satisfies IndicationDictionary;
};

/** Uses a token to verify a user and indicates the resulting state */
const VerifyAccountIndicator = (params: IVerifyAccountIndicatorParams) => {
  /** Localization text */
  const { LL } = useI18nContext();

  const verifyAccountIndications = useMemo(() => {
    return verifyAccountIndicationsFromLocale(LL);
  }, [LL]);

  /** Indication state */
  const state = useVerifyAccountIndicator(params.token);
  const indication = verifyAccountIndications[state];
  const IndicationIcon = indication.icon;

  return (
    <Stack>
      <div>
        <IndicationIcon />
        <span>{indication.text}</span>
      </div>
      {state === EVerifyAccountStateIndicator.Success && (
        <Button variant="contained" component={Link} to={ERoutes.Login}>
          {LL.Verify.ButtonContinueLogin()}
        </Button>
      )}
    </Stack>
  );
};

export default VerifyAccountIndicator;
