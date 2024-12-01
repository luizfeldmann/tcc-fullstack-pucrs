import { z } from "zod";

const publicEnvironmentSchema = z.object({
  NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY: z.string(),
});

export type IPublicEnvironment = z.infer<typeof publicEnvironmentSchema>;

export const publicEnvironment: IPublicEnvironment =
  publicEnvironmentSchema.parse({
    NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY:
      process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY,
  });
