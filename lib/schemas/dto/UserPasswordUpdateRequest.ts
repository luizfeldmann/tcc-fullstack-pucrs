import { z } from "zod";

export const userUpdatePasswordRequestSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

/** Data for when the user wants to set a new password and knows the current one too */
export type IUserUpdatePasswordRequestData = z.infer<
  typeof userUpdatePasswordRequestSchema
>;
