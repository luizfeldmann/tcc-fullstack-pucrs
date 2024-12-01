import { z } from "zod";

export const signupRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string(),
  password: z.string(),
});

/** Request data for a new user */
export type SignupRequestData = z.infer<typeof signupRequestSchema>;
