"use client";

import React, { useMemo } from "react";
import { navigatorDetector } from "typesafe-i18n/detectors";
import TypesafeI18n from "../localization/i18n-react";
import { detectLocale } from "../localization/i18n-util";
import { loadLocale } from "../localization/i18n-util.sync";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

/** Groups all the context providers in the top-level app */
export const Providers = (props: { children: React.ReactNode }) => {
  /** Handle loading the locale (once) */
  const detectedLocale = useMemo(() => {
    const detectedLocale = detectLocale(navigatorDetector);
    loadLocale(detectedLocale);

    return detectedLocale;
  }, []);

  /** Create a theme */
  const theme = useMemo(() => {
    return createTheme();
  }, []);

  // Return all nested contents
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <TypesafeI18n locale={detectedLocale}>{props.children}</TypesafeI18n>
      </ThemeProvider>
    </CssBaseline>
  );
};
