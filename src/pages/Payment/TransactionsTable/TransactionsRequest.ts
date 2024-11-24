import { z } from "zod";
import { appAxios, withAuthorizationHeader } from "../../../app-axios";
import { AxiosError, AxiosResponse } from "axios";
import StatusCode from "status-code-enum";

/** Data passed to the transactions request */
export interface ITransactionsRequest {
  /** Maximum number of transactions to return */
  limit: number;

  /** How many transactions to skip before returning the sequence */
  skip: number;
}

/** The types of transactions */
export enum ETransactionType {
  /** Credit from a redeemable code was added to the account */
  ERedeemCode = "redeem-code",
}

const schemaTransactionItem = z.object({
  _id: z.string(),
  amount: z.number(),
  type: z.nativeEnum(ETransactionType),
  time: z.coerce.date(),
});

/** Data of each returned transaction item */
export type ITransactionResponseItem = Zod.infer<typeof schemaTransactionItem>;

const schemaTransactionsResponse = z.object({
  count: z.number(),
  items: z.array(schemaTransactionItem),
});

/** Data returned by the transactions request */
export type ITransactionsResponse = Zod.infer<
  typeof schemaTransactionsResponse
>;

/** Reads from the server the list of transactions */
export const TransactionRequest = (
  token: string,
  req: ITransactionsRequest,
  onResponse: (resp: ITransactionsResponse | undefined) => void
) => {
  const onAxiosResponse = (resp: AxiosResponse | undefined) => {
    if (!resp || resp.status != StatusCode.SuccessOK)
      return onResponse(undefined);

    const { data, success } = schemaTransactionsResponse.safeParse(resp.data);

    if (!success) return onResponse(undefined);

    return onResponse(data);
  };

  appAxios
    .post("/transactions", req, {
      headers: {
        ...withAuthorizationHeader(token),
      },
    })
    .then((resp) => {
      onAxiosResponse(resp);
    })
    .catch((error: AxiosError) => {
      onAxiosResponse(error.response);
    });
};
