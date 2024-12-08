import { readPublicEnvironment } from "@/lib/constants/PublicEnvironment";
import { useEffect, useState } from "react";

/**
 * Retrieves the captcha public key from the server side
 * Use only in client-components
 */
export const useCaptcha = () => {
  const [publicKey, setPublicKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    readPublicEnvironment().then((serverEnv) => {
      setPublicKey(serverEnv.PUBLIC_RECAPTCHA_CLIENT_KEY);
    });
  });

  return publicKey;
};
