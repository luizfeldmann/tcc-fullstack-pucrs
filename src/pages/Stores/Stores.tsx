import { Stack } from "@mui/material";
import { useI18nContext } from "../../localization/i18n-react";
import StoresList from "./StoresList";

/**
 * Page where the user may find selling locations
 */
const Stores = () => {
  const { LL } = useI18nContext();

  return (
    <Stack spacing={1}>
      <h1>{LL.Stores.Title()}</h1>
      <StoresList />
    </Stack>
  );
};

export default Stores;
