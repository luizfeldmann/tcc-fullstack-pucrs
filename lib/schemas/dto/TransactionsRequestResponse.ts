import { z } from "zod";
import { ETransactionType } from "./ETransactionType";

export const transactionsRequestSchema = z.object({
  limit: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
});

/** DTO to request transactions of the user */
export type ITransactionsRequestData = z.infer<
  typeof transactionsRequestSchema
>;

export const transactionItemSchema = z.object({
  _id: z.string(),
  amount: z.number(),
  type: z.nativeEnum(ETransactionType),
  time: z.coerce.date(),
});

/** Data of each returned transaction item */
export type ITransactionResponseItemData = z.infer<
  typeof transactionItemSchema
>;

export const transactionsResponseSchema = z.object({
  count: z.number(),
  items: z.array(transactionItemSchema),
});

/** Data returned by the transactions request */
export type ITransactionsResponseData = Zod.infer<
  typeof transactionsResponseSchema
>;
