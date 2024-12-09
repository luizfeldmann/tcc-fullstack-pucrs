import { z } from "zod";

/** Request schema for redeeming a code */
export const redeemCodeRequestSchema = z.object({
  redeemCode: z.string(),
});

/** Data passed when requested to redeem a code */
export type IRedeemCodeRequestData = z.infer<typeof redeemCodeRequestSchema>;
