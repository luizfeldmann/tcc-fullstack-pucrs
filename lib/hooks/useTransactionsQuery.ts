import { useQuery } from "@tanstack/react-query";
import {
  ITransactionsRequestData,
  ITransactionsResponseData,
  transactionsResponseSchema,
} from "../schemas/dto/TransactionsRequestResponse";
import { appAxios, withAuthorizationHeader } from "../singleton/app-axios";

/** Query key for the list of transactions */
export const transactionsQueryKey: string = "/transactions";

/** Hook to read the transactions list */
export const useTransactionsQuery = (
  token: string | undefined,
  limit: number,
  skip: number
) => {
  return useQuery({
    queryKey: [transactionsQueryKey, token, limit, skip],
    queryFn: async (): Promise<ITransactionsResponseData> => {
      if (!token) return Promise.reject();

      const resp = await appAxios.post(
        transactionsQueryKey,
        {
          limit,
          skip,
        } satisfies ITransactionsRequestData,
        {
          headers: {
            ...withAuthorizationHeader(token),
          },
        }
      );

      return await transactionsResponseSchema.parseAsync(resp.data);
    },
  });
};
