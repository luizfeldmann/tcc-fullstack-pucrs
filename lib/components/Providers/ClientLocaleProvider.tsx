"use client";

import TypesafeI18n from "@/lib/localization/i18n-react";
import { Locales } from "@/lib/localization/i18n-types";
import { loadLocale } from "@/lib/localization/i18n-util.sync";

export const ClientLocaleProvider = (props: {
  locale: Locales;
  children: React.ReactNode;
}) => {
  loadLocale(props.locale);
  return <TypesafeI18n locale={props.locale}>{props.children}</TypesafeI18n>;
};
