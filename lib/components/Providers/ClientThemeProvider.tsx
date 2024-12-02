"use client";

import React, { useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

/** Groups all the context providers in the top-level app */
export const ClientThemeProvider = (props: { children: React.ReactNode }) => {
  /** Create a theme */
  const theme = useMemo(() => {
    return createTheme();
  }, []);

  // Return all nested contents
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </CssBaseline>
  );
};
