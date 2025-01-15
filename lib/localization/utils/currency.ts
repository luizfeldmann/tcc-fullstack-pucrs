import { Locales } from "../i18n-types";

export const getCurrencyFormat = (locale: Locales) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  });
