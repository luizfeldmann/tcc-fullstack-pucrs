import { Locales, TranslationFunctions } from "@/lib/localization/i18n-types";
import { IStoreHours } from "@/lib/schemas/dto/StoreDetailsResponse";

const formatHour = (locale: Locales, hour: number) => {
  const date = new Date();
  date.setHours(Math.floor(hour));
  date.setMinutes((hour - date.getHours()) * 60);

  return date.toLocaleString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/** Calculated opening hours info */
export interface IWorkingHoursInfo {
  open: boolean;
  hint: string;
}

/** Check if the store is open and/or a relevent hint */
export const CalcWorkingHours = (
  locale: Locales,
  LL: TranslationFunctions,
  workingHours: IStoreHours[] | undefined
): IWorkingHoursInfo => {
  // Trivial case - no information
  if (!workingHours || workingHours.length == 0) {
    return {
      open: false,
      hint: LL.Stores.NoInfo(),
    };
  }

  // Current time
  const now = new Date();

  // Check if the store is open right now
  const openNow = workingHours.find(
    (item) =>
      item.weekday == now.getDay() &&
      item.opens <= now.getHours() &&
      item.closes >= now.getHours()
  );

  if (openNow) {
    return {
      open: true,
      hint: LL.Stores.ClosingTime(formatHour(locale, openNow.closes)),
    };
  }

  // Order by weekday and by opening hour
  workingHours.sort((a, b) => {
    return a.weekday - b.weekday || a.opens - b.opens;
  });

  // Check if it opens later today
  const openLaterToday = workingHours.find(
    (item) => item.weekday == now.getDay() && item.opens >= now.getHours()
  );

  if (openLaterToday) {
    return {
      open: false,
      hint: LL.Stores.OpeningTime(formatHour(locale, openLaterToday.opens)),
    };
  }

  // Check the next weekday when will be open
  // Next day this week or first day next week
  const openAnotherDay =
    workingHours.find((item) => item.weekday > now.getDay()) || workingHours[0];

  while (now.getDay() != openAnotherDay.weekday) now.setDate(1 + now.getDate());

  return {
    open: false,
    hint: LL.Stores.OpeningDay(
      new Intl.DateTimeFormat(locale, { weekday: "long" }).format(now)
    ),
  };
};
