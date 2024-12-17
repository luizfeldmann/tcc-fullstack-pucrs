import { useQuery } from "@tanstack/react-query";
import { appAxios } from "../singleton/app-axios";
import {
  IStoresListResponseData,
  storesListResponseSchema,
} from "../schemas/dto/StoresListResponse";

/** Query key for the list of stores */
const storesListQuery: string = "/stores";

/** Query to read the list of stores */
export const useStoresListQuery = () => {
  return useQuery<IStoresListResponseData>({
    queryKey: [storesListQuery],
    queryFn: async () => {
      const resp = await appAxios.get(storesListQuery);
      return await storesListResponseSchema.parseAsync(resp.data);
    },
  });
};
