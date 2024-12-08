import { z } from "zod";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

/** Defines the types of the variables in the environment */
const serverEnvironmentSchema = z.object({
  // Variables safe to access in client-side
  PUBLIC_RECAPTCHA_CLIENT_KEY: z.string(),

  // Variables exclusive for server-side
  MONGO_URI: z.string(),
  JWT_PVT_KEY: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number().int(),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string(),
});

/** Shape of the environment variables object */
export type IServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

const getEnvironment = (): IServerEnvironment => {
  // During build-time don't risk exposing any server-only variables
  if (process.env.NEXT_PHASE == PHASE_PRODUCTION_BUILD)
    return {
      PUBLIC_RECAPTCHA_CLIENT_KEY: "",
      MONGO_URI: "",
      JWT_PVT_KEY: "",
      EMAIL_HOST: "",
      EMAIL_PORT: 0,
      EMAIL_USER: "",
      EMAIL_PASS: "",
    };

  // During runtime read the actual environment
  return serverEnvironmentSchema.parse({
    PUBLIC_RECAPTCHA_CLIENT_KEY: process.env.PUBLIC_RECAPTCHA_CLIENT_KEY,
    MONGO_URI: process.env.MONGO_URI,
    JWT_PVT_KEY: process.env.JWT_PVT_KEY,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  });
};

/** Instance of the environement variables' data */
export const serverEnvironment = getEnvironment();
