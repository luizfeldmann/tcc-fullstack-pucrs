"use server";

import { serverEnvironment } from "./ServerEnvironment";

/** Reads the subset of environment variables which may be visible from the client-side */
export async function readPublicEnvironment() {
  return {
    PUBLIC_RECAPTCHA_CLIENT_KEY: serverEnvironment.PUBLIC_RECAPTCHA_CLIENT_KEY,
  };
}
