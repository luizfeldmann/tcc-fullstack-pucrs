"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import {
  styled,
  Card,
  Alert,
  Box,
  CardMedia,
  CardContent,
  Stack,
  Typography,
  Chip,
  Divider,
  Rating,
  Skeleton,
} from "@mui/material";
import { useMemo } from "react";
import { CalcWorkingHours } from "./CalcWorkingHours";
import { useStoreDetailQuery } from "@/lib/hooks/useStoreDetailQuery";

const DynamicCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.containerQueries.up(750)]: {
    flexDirection: "row",
  },
}));

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
    <Box
      sx={{
        overflow: "auto",
        containerType: "inline-size",
      }}
    >
      <DynamicCard>
        <CardMedia component={DynamicCardImage} image="" />
        <CardContent component={Stack} flexGrow={1}>
          <Stack direction="row" flexWrap="wrap">
            <Stack sx={{ flexGrow: 1 }}>
              <Typography variant="h5">
                {storeInfo.data ? storeInfo.data.name : <Skeleton />}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                {storeInfo.data ? storeInfo.data.address : <Skeleton />}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack alignItems="center">
                <Chip
                  color={hoursInfo.open ? "success" : "error"}
                  variant="outlined"
                  label={
                    hoursInfo.open
                      ? LL.Stores.OpenStatus()
                      : LL.Stores.ClosedStatus()
                  }
                />
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary" }}
                >
                  {hoursInfo.hint}
                </Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack alignItems="center">
                {storeInfo.data && (
                  <Rating
                    name="read-only"
                    value={storeInfo.data.rating}
                    readOnly
                  />
                )}
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary" }}
                >
                  {storeInfo.data ? storeInfo.data.countRatings : <Skeleton />}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Typography sx={{ color: "text.primary" }}>
            {storeInfo.data ? storeInfo.data.description : <Skeleton />}
          </Typography>
        </CardContent>
      </DynamicCard>
    </Box>
  );
};
