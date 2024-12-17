"use client";

import { useStoresListQuery } from "@/lib/hooks/useStoresListQuery";
import { Alert, Skeleton, Stack } from "@mui/material";
import { StoresListItem } from "./StoresListItem";

/**
 * List for browsing the available stores
 */
const StoresList = () => {
  const queryIds = useStoresListQuery();

  if (queryIds.isLoading) return <Skeleton />;

  if (queryIds.isError)
    return <Alert severity="error">{queryIds.error.message}</Alert>;

  return (
    <Stack spacing={1}>
      {queryIds.data?.map((id) => (
        <StoresListItem key={id} storeId={id} />
      ))}
    </Stack>
  );
};

export default StoresList;
