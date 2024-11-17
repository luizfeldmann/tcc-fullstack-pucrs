import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";

/**
 * Logged-in area main landing page
 */
const Main = () => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.Main.Title()}</h1>
    </Stack>
  );
};

export default Main;
