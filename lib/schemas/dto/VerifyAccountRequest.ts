import { z } from "zod";

export const verifyAccountRequestSchema = z.object({
  token: z.string(),
});

/** Request data for the new user verification */
export type IVerifyAccountRequestData = z.infer<
  typeof verifyAccountRequestSchema
>;
