import { headers } from "next/headers";
import { use, useMemo } from "react";
import { pick as pickLanguage } from "accept-language-parser";
import { loadLocale } from "../localization/i18n-util.sync";
import { baseLocale, i18nObject, locales } from "../localization/i18n-util";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

/** Reads the accepted language from the headers */
const getAcceptLanguage = (headers: ReadonlyHeaders) =>
  headers.get("Accept-Language");

/** Picks the locale from the accept-language header */
const i18nFromAcceptLanguage = (acceptLanguage: string | null) => {
  const locale = pickLanguage(locales, acceptLanguage ?? "") ?? baseLocale;
  loadLocale(locale);

  const LL = i18nObject(locale);

  return { locale, LL };
};

/**
 * Gets the localization from the server request
 */
export const getServerLocalization = async () => {
  const acceptLanguage = getAcceptLanguage(await headers());
  return i18nFromAcceptLanguage(acceptLanguage);
};

/**
 * Hook gets the localization from the server request
 */
export const useServerLocalization = () => {
  /** Get the expected language from the request */
  const headersList = use(headers());
  const acceptLanguage = getAcceptLanguage(headersList);

  /** Handle loading the locale (once) */
  return useMemo(
    () => i18nFromAcceptLanguage(acceptLanguage),
    [acceptLanguage]
  );
};
