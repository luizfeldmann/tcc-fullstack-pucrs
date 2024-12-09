import { z } from "zod";

/** Schema to extract the balance from the response */
export const balanceResponseSchema = z.object({
  balance: z.number(),
});

/** Data of the balance query */
export type IBalanceResponseData = z.infer<typeof balanceResponseSchema>;
