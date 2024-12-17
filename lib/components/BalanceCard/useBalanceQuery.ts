import {
  balanceResponseSchema,
  IBalanceResponseData,
} from "@/lib/schemas/dto/BalanceResponse";
import { appAxios, withAuthorizationHeader } from "@/lib/singleton/app-axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

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

/** Gets a callback that can be used to invalidate the balance query */
export const useInvalidateBalanceQuery = (token?: string) => {
  const client = useQueryClient();
  return useCallback(() => {
    client.invalidateQueries({
      queryKey: [balanceQueryKey, token],
    });
  }, [client, token]);
};
