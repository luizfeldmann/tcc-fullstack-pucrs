import { useQuery } from "@tanstack/react-query";
import { appAxios, withAuthorizationHeader } from "../../app-axios";
import { z } from "zod";
import { queryClient } from "../../app-query";

/** Query key for the balance */
const balanceQueryKey: string = "/balance";

/** Schema to extract the balance from the response */
const balanceSchema = z.object({
  balance: z.number(),
});

/** Requests the balance from the server */
const requestBalance = (token: string): Promise<number> => {
  return appAxios
    .get(balanceQueryKey, {
      headers: {
        ...withAuthorizationHeader(token),
      },
    })
    .then((resp) => {
      const { data, success } = balanceSchema.safeParse(resp.data);

      if (!success) return Promise.reject();

      return data.balance;
    })
    .catch(() => {
      return Promise.reject();
    });
};

/** Notifies that the balance query is now invalid */
export const invalidateBalanceQuery = () => {
  queryClient.invalidateQueries({
    queryKey: [balanceQueryKey],
  });
};

/** Hook to read the balance */
export const useBalanceQuery = (token: string) => {
  return useQuery(
    {
      queryKey: [balanceQueryKey],
      queryFn: async () => {
        return await requestBalance(token);
      },
    },
    queryClient
  );
};
