"use client";

import { StoreDetailsURL } from "@/lib/constants/ERoutes";
import { CardActionArea } from "@mui/material";

export function StoreListItemCardActionArea(props: {
  storeId: string;
  children: React.ReactNode;
}) {
  return (
    <CardActionArea
      href={StoreDetailsURL(props.storeId)}
      sx={(theme) => ({
        display: "flex",
        overflow: "auto",
        containerType: "inline-size",
        flexDirection: "column",
        [theme.containerQueries.up(750)]: {
          flexDirection: "row",
        },
      })}
    >
      {props.children}
    </CardActionArea>
  );
}
