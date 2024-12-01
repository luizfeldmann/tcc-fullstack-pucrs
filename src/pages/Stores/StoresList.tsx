import { Alert, Skeleton, Stack } from "@mui/material";
import { StoresListItem } from "./StoresListItem";
import { useStoreDetailQuery, useStoresListQuery } from "./useStoresQuery";

const StoreItemWrapper = (props: { storeId: string }) => {
  const storeInfo = useStoreDetailQuery(props.storeId);

  if (storeInfo.isError)
    return <Alert severity="error">{storeInfo.error.message}</Alert>;

  if (storeInfo.isLoading) return <Skeleton />;

  return <StoresListItem storeInfo={storeInfo.data!} />;
};

/**
 * List for browsing the available stores
 */
const StoresList = () => {
  const queryIds = useStoresListQuery();

  return (
    <Stack spacing={1}>
      {queryIds.isLoading && <Skeleton />}
      {queryIds.isError && (
        <Alert severity="error">{queryIds.error.message}</Alert>
      )}
      {queryIds.isSuccess &&
        queryIds.data.map((id) => <StoreItemWrapper key={id} storeId={id} />)}
    </Stack>
  );
};

export default StoresList;
