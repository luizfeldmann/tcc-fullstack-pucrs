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

/** How to format the weekdays */
const makeWeekdayFmt = (locale: Locales) =>
  new Intl.DateTimeFormat(locale, { weekday: "long" });

/** Calculated opening hours info */
export interface IWorkingHoursInfo {
  open: boolean;
  hint: string;
}

/** Check if the store is open and/or a relevent hint */
export const CalcWorkingHours = (
  locale: Locales,
  LL: TranslationFunctions,
  workingHours?: IStoreHours[]
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

  const weekdayFmt = makeWeekdayFmt(locale);
  return {
    open: false,
    hint: LL.Stores.OpeningDay(weekdayFmt.format(now)),
  };
};

export interface IWorkingHoursSummary {
  id: number;
  weekday: string;
  hours: {
    opens: string;
    closes: string;
  }[];
}

export const FormatWorkingHours = (
  locale: Locales,
  workingHours: IStoreHours[]
): IWorkingHoursSummary[] => {
  const weekdayFmt = makeWeekdayFmt(locale);

  // Start the list from today
  const now = new Date();

  // Iterate the 7 days of the week
  return [...Array(7)].map((_, i) => {
    // Increment the day of the week
    const weekdayDate = new Date(now);
    weekdayDate.setDate(i + now.getDate());

    return {
      id: weekdayDate.getDay(),
      weekday: weekdayFmt.format(weekdayDate),
      hours: workingHours
        .filter((x) => x.weekday == weekdayDate.getDay())
        .map((x) => ({
          opens: formatHour(locale, x.opens),
          closes: formatHour(locale, x.closes),
        })),
    };
  });
};
