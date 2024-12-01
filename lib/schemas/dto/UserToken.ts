import { z } from "zod";

/** Associates a token with a particular purpose, so it cannot be misused */
export enum EUserTokenPurpose {
  /** Token can be used to log the user in */
  ELogin = "login",

  /** Token can be used to reset the user's forgotten password */
  EResetPassword = "reset",

  /** Token can be used to verify a newly created account */
  EVerifyAccount = "verify",
}

/** Format of the JWT payload used as user token */
export const UserTokenSchema = z.object({
  id: z.string(),
  purpose: z.nativeEnum(EUserTokenPurpose),
});

/** User token payload data */
export type UserToken = z.infer<typeof UserTokenSchema>;
