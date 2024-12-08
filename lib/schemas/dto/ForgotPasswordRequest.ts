import { z } from "zod";

export const forgotPasswordRequestSchema = z.object({
  emailAddress: z.string(),
});

/** DTO for the login request */
export type IForgotPasswordRequestData = z.infer<
  typeof forgotPasswordRequestSchema
>;
