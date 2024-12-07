import { z } from "zod";

export const loginRequestSchema = z.object({
  emailAddress: z.string(),
  password: z.string(),
});

/** DTO for the login request */
export type ILoginRequestData = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
  token: z.string(),
});

/** DTO for the login response */
export type ILoginResponseData = z.infer<typeof loginResponseSchema>;
