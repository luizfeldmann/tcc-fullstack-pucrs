"use client";

import { useSearchParams } from "next/navigation";
import {
  EVerifyAccountStateIndicator,
  useVerifyAccountIndicator,
} from "./useVerifyAccountIndicator";
import { TranslationFunctions } from "@/lib/localization/i18n-types";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Block, Login, SearchOff } from "@mui/icons-material";
import { Alert, AlertColor, Button } from "@mui/material";
import { ERoutes } from "@/lib/constants/ERoutes";

/** Describes the UI information presented for one verificatio state */
interface IVerifyAccountIndication {
  /** The color of the alert box */
  severity: AlertColor;
  /** Text presented to the user */
  text: string;
  /** Associated icon presented */
  icon?: React.ReactNode;
}

/** Mapping between verification states and the corresponding indication in the UI  */
const verifyAccountIndicationsFromLocale = (LL: TranslationFunctions) => {
  return {
    [EVerifyAccountStateIndicator.UnknownError]: {
      severity: "error",
      text: LL.Verify.Status.UnknownError(),
    },
    [EVerifyAccountStateIndicator.Loading]: {
      severity: "info",
      text: LL.Verify.Status.Loading(),
      icon: <CircularProgress />,
    },
    [EVerifyAccountStateIndicator.Success]: {
      severity: "success",
      text: LL.Verify.Status.Verified(),
    },
    [EVerifyAccountStateIndicator.AccountNotExist]: {
      severity: "warning",
      text: LL.Verify.Status.NotExist(),
      icon: <SearchOff />,
    },
    [EVerifyAccountStateIndicator.InvalidToken]: {
      severity: "error",
      text: LL.Verify.Status.Invalid(),
      icon: <Block />,
    },
  } satisfies {
    [K in EVerifyAccountStateIndicator]: IVerifyAccountIndication;
  };
};

export const VerifyAccountIndicator = () => {
  /** Localization text */
  const { LL } = useI18nContext();

  const verifyAccountIndications = useMemo(() => {
    return verifyAccountIndicationsFromLocale(LL);
  }, [LL]);

  // Get the token from the URL
  const query = useSearchParams();
  const token = query.get("t") ?? "";

  // Logic for the form
  const status = useVerifyAccountIndicator(token);

  // Show the correct alert based on the status
  const indication: IVerifyAccountIndication = verifyAccountIndications[status];

  return (
    <>
      <Alert severity={indication.severity} icon={indication.icon}>
        {indication.text}
      </Alert>
      {status == EVerifyAccountStateIndicator.Success && (
        <Button
          variant="contained"
          type="submit"
          startIcon={<Login />}
          href={ERoutes.Login}
        >
          {LL.Verify.ButtonContinueLogin()}
        </Button>
      )}
    </>
  );
};
