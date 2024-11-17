import { Stack } from "@mui/material";
import VerifyAccountIndicator from "./VerifyAccountIndicator";
import { useParams } from "react-router-dom";
import { useI18nContext } from "../../localization/i18n-react";

/** New account verification page accessed from the verification link */
const Verify = () => {
  const { LL } = useI18nContext();

  /** The URL of the verification link contains the token */
  const { token } = useParams();

  return (
    <Stack>
      <h1>{LL.Verify.Title()}</h1>
      <VerifyAccountIndicator token={token || ""} />
    </Stack>
  );
};

export default Verify;
