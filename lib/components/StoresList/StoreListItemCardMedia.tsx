/* eslint-disable @next/next/no-img-element */
"use client";

import { CardMedia, styled } from "@mui/material";

const DynamicCardImage = styled("img")(({ theme }) => ({
  alignSelf: "stretch",
  aspectRatio: "16 / 9",
  objectFit: "cover",
  width: "100%",
  maxHeight: 160,
  transition: "0.4s",
  [theme.containerQueries.up(750)]: {
    maxWidth: 256,
    maxHeight: "initial",
  },
}));

export function StoreListItemCardMedia(props: { imageSrc: string }) {
  return (
    <CardMedia component={DynamicCardImage} image={props.imageSrc} alt="" />
  );
}
