import { useQuery } from "@tanstack/react-query";
import { appAxios } from "../singleton/app-axios";
import {
  IStoreDetailsResponseData,
  storeDetailsSchema,
} from "../schemas/dto/StoreDetailsResponse";

/** Query key for one store */
const storesInfoQuery: string = "/store";

/** Query to read the details of one store */
export const useStoreDetailQuery = (id: string) => {
  return useQuery<IStoreDetailsResponseData>({
    queryKey: [storesInfoQuery, id],
    queryFn: async () => {
      const resp = await appAxios.get(`${storesInfoQuery}?id=${id}`);
      return await storeDetailsSchema.parseAsync(resp.data);
    },
  });
};
