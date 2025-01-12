import { Stack } from "@mui/material";
import { StoresListItem } from "./StoresListItem";
import { GetStoresList } from "@/lib/controllers/stores";

/**
 * List for browsing the available stores
 */
const StoresList = async () => {
  const storeIds = await GetStoresList();

  return (
    <Stack spacing={1}>
      {storeIds.map((id) => (
        <StoresListItem key={id} storeId={id} />
      ))}
    </Stack>
  );
};

export default StoresList;
