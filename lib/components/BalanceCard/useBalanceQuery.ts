import {
  balanceResponseSchema,
  IBalanceResponseData,
} from "@/lib/schemas/dto/BalanceResponse";
import { appAxios, withAuthorizationHeader } from "@/lib/singleton/app-axios";
import { useQuery } from "@tanstack/react-query";

/** Query key for the balance */
export const balanceQueryKey: string = "/transactions/balance";

/** Hook to read the balance */
export const useBalanceQuery = (token?: string) => {
  return useQuery({
    queryKey: [balanceQueryKey, token],

    queryFn: async (): Promise<IBalanceResponseData> => {
      if (!token) return Promise.reject();

      const resp = await appAxios.get(balanceQueryKey, {
        headers: {
          ...withAuthorizationHeader(token),
        },
      });
      return await balanceResponseSchema.parseAsync(resp.data);
    },
  });
};
