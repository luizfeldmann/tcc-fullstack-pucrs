import { z } from "zod";

/** Schema to extract the user info from the response */
export const userAccountInfoResponseSchema = z.object({
  emailAddress: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

/** Basic user account information */
export type IUserAccountInfoResponseData = z.infer<
  typeof userAccountInfoResponseSchema
>;
