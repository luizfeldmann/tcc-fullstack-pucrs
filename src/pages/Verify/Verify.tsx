import { Stack } from "@mui/material";
import VerifyAccountIndicator from "./VerifyAccountIndicator";
import { useParams } from "react-router-dom";

/** New account verification page accessed from the verification link */
const Verify = () => {
  const { token } = useParams();

  return (
    <Stack>
      <h1>Verify Account</h1>
      <VerifyAccountIndicator token={token || ""} />
    </Stack>
  );
};

export default Verify;
