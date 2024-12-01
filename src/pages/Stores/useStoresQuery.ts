import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../app-query";
import { appAxios } from "../../app-axios";
import { z } from "zod";
import { IStoreInfo, schemaStoreInfo } from "./StoreInfo";

/** Query key for the list of stores */
const storesListQuery: string = "/stores";

/** Query key for one store */
const storesInfoQuery: string = "/store";

/** Query to read the list of stores */
export const useStoresListQuery = () => {
  return useQuery<string[]>(
    {
      queryKey: [storesListQuery],
      queryFn: async () => {
        const resp = await appAxios.get(storesListQuery);
        return await z.array(z.string()).parseAsync(resp.data);
      },
    },
    queryClient
  );
};

/** Query to read the details of one store */
export const useStoreDetailQuery = (id: string) => {
  return useQuery<IStoreInfo>(
    {
      queryKey: [storesInfoQuery, id],
      queryFn: async () => {
        const resp = await appAxios.get(`${storesInfoQuery}/${id}`);
        return await schemaStoreInfo.parseAsync(resp.data);
      },
    },
    queryClient
  );
};
