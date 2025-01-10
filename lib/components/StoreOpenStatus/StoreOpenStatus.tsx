"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { Chip, Stack, Typography } from "@mui/material";
import { IWorkingHoursInfo } from "../StoresList/CalcWorkingHours";

export function StoreOpenStatus(props: { hoursInfo: IWorkingHoursInfo }) {
  const { LL } = useI18nContext();

  return (
    <Stack alignItems="center" direction="column">
      <Chip
        color={props.hoursInfo.open ? "success" : "error"}
        variant="outlined"
        label={
          props.hoursInfo.open
            ? LL.Stores.OpenStatus()
            : LL.Stores.ClosedStatus()
        }
      />
      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        {props.hoursInfo.hint}
      </Typography>
    </Stack>
  );
}
