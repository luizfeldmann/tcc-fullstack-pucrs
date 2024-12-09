import { z } from "zod";

/** Request schema for updating a user information */
export const userAccountBasicInfoUpdateRequestSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

/** Data passed in an update of user basic account info */
export type IUserAccountBasicInfoUpdateRequestData = z.infer<
  typeof userAccountBasicInfoUpdateRequestSchema
>;
