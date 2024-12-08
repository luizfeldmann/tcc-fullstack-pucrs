"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { Typography, TypographyProps } from "@mui/material";

export const AppTitle = (props: TypographyProps) => {
  /** Context for localization */
  const { LL } = useI18nContext();

  return <Typography {...props}>{LL.Layout.AppTitle()}</Typography>;
};
