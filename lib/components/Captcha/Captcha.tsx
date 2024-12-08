"use client";

import ReCAPTCHA, { ReCAPTCHAProps } from "react-google-recaptcha";
import { useCaptcha } from "./useCaptcha";
import { Skeleton } from "@mui/material";

export const Captcha = (props: Omit<ReCAPTCHAProps, "sitekey">) => {
  // Fetch the captcha public key from the server
  const sitekey = useCaptcha();

  // Skeleton if the key is not available yey
  if (!sitekey) return <Skeleton />;

  // Render the regular captcha
  return <ReCAPTCHA {...{ ...props, sitekey }} />;
};
