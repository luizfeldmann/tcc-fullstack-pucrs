import { z } from "zod";

const serverEnvironmentSchema = z.object({
  MONGO_URI: z.string(),
  JWT_PVT_KEY: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number().int(),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string(),
});

export type IServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

export const serverEnvironment: IServerEnvironment =
  serverEnvironmentSchema.parse({
    MONGO_URI: process.env.MONGO_URI,
    JWT_PVT_KEY: process.env.JWT_PVT_KEY,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  });
