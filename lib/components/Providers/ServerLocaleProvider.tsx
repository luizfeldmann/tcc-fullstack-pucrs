import { headers } from "next/headers";
import { use, useMemo } from "react";
import { pick as pickLanguage } from "accept-language-parser";
import { baseLocale, locales } from "../../localization/i18n-util";
import { loadLocale } from "../../localization/i18n-util.sync";
import { ClientLocaleProvider } from "./ClientLocaleProvider";

export const ServerLocaleProvider = (props: { children: React.ReactNode }) => {
  /** Get the expected language from the request */
  const headersList = use(headers());
  const acceptLanguage = headersList.get("Accept-Language");

  /** Handle loading the locale (once) */
  const locale = useMemo(() => {
    const detectedLocale =
      pickLanguage(locales, acceptLanguage ?? "") ?? baseLocale;
    loadLocale(detectedLocale);
    return detectedLocale;
  }, [acceptLanguage]);

  // Render the client context
  return (
    <ClientLocaleProvider locale={locale}>
      {props.children}
    </ClientLocaleProvider>
  );
};
