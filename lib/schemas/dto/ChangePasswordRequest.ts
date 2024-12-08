import { z } from "zod";

export const changePasswordRequestSchema = z.object({
  token: z.string(),
  password: z.string(),
});

/** DTO for the password change request */
export type IChangePasswordRequestData = z.infer<
  typeof changePasswordRequestSchema
>;
