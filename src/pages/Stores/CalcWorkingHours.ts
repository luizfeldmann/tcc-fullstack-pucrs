import { TranslationFunctions } from "../../localization/i18n-types";
import { IStoreHours } from "./StoreInfo";

const formatHour = (hour: number) => {
  const wholeHour = Math.floor(hour);
  const minutes = (hour - wholeHour) * 60;

  return wholeHour.toFixed(2) + "h" + minutes.toFixed(2);
};

/** Calculated opening hours info */
interface IWorkingHoursInfo {
  open: boolean;
  hint: string;
}

/** Check if the store is open and/or a relevent hint */
export const CalcWorkingHours = (
  LL: TranslationFunctions,
  workingHours: IStoreHours[]
): IWorkingHoursInfo => {
  // Trivial case - no information
  if (workingHours.length == 0) {
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
      hint: LL.Stores.ClosingTime(formatHour(openNow.closes)),
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
      hint: LL.Stores.OpeningTime(formatHour(openLaterToday.opens)),
    };
  }

  // Check the next weekday when will be open
  // Next day this week or first day next week
  const openAnotherDay =
    workingHours.find((item) => item.weekday > now.getDay()) || workingHours[0];

  while (now.getDay() != openAnotherDay.weekday) now.setDate(1 + now.getDate());

  return {
    open: false,
    hint: new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(now),
  };
};
