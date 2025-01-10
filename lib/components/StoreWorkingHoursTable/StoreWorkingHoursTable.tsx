import {
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";
import { FormatWorkingHours } from "../StoresList/CalcWorkingHours";
import { Locales } from "@/lib/localization/i18n-types";
import { IStoreHours } from "@/lib/schemas/dto/StoreDetailsResponse";

export function StoreWorkingHoursTable(props: {
  locale: Locales;
  workingHours: IStoreHours[];
}) {
  const hoursSummary = useMemo(
    () => FormatWorkingHours(props.locale, props.workingHours),
    [props.locale, props.workingHours]
  );

  return (
    <Table size="small">
      <TableBody>
        {hoursSummary.map((info) => (
          <TableRow key={info.id}>
            <TableCell>{info.weekday}</TableCell>
            <TableCell>
              <List style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                {info.hours.map((interval, i) => (
                  <ListItem key={i}>
                    {interval.opens} - {interval.closes}
                  </ListItem>
                ))}
              </List>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
