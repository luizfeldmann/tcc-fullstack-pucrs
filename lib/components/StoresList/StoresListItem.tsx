"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import {
  styled,
  Card,
  Alert,
  CardMedia,
  CardContent,
  Stack,
  Typography,
  Divider,
  Skeleton,
  CardActionArea,
} from "@mui/material";
import { useMemo } from "react";
import { CalcWorkingHours } from "./CalcWorkingHours";
import { useStoreDetailQuery } from "@/lib/hooks/useStoreDetailQuery";
import { StoreDetailsURL } from "@/lib/constants/ERoutes";
import { StoreOpenStatus } from "../StoreOpenStatus/StoreOpenStatus";
import { StoreRatingIndicator } from "../StoreRatingIndicator/StoreRatingIndicator";

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

/** One card in the list of stores */
export const StoresListItem = (props: { storeId: string }) => {
  // Localization
  const { locale, LL } = useI18nContext();

  // Query the store details
  const storeInfo = useStoreDetailQuery(props.storeId);

  // Check if open now or when will open or close
  const hoursInfo = useMemo(
    () => CalcWorkingHours(locale, LL, storeInfo.data?.workingHours),
    [locale, LL, storeInfo.data?.workingHours]
  );

  // Show error
  if (storeInfo.isError)
    return <Alert severity="error">{storeInfo.error.message}</Alert>;

  // Show data card
  return (
    <Card
      sx={{
        overflow: "auto",
        containerType: "inline-size",
      }}
    >
      <CardActionArea
        {...(storeInfo.isSuccess
          ? { href: StoreDetailsURL(storeInfo.data?.id) }
          : {})}
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
        <CardMedia
          component={DynamicCardImage}
          image={storeInfo.data?.imageSrc}
          alt=" "
        />
        <CardContent component={Stack} flexGrow={1}>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={2}
          >
            <Stack sx={{ flexGrow: 1 }}>
              <Typography variant="h5">
                {storeInfo.data ? storeInfo.data.name : <Skeleton />}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                {storeInfo.data ? storeInfo.data.address : <Skeleton />}
              </Typography>
            </Stack>
            <StoreOpenStatus hoursInfo={hoursInfo} />
            <Divider orientation="vertical" flexItem />
            <StoreRatingIndicator
              rating={storeInfo.data?.rating}
              countRatings={storeInfo.data?.countRatings}
            />
          </Stack>
          <Divider />
          <Typography sx={{ color: "text.primary" }}>
            {storeInfo.data ? storeInfo.data.description : <Skeleton />}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
