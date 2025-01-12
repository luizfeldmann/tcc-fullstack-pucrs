import { Card, CardContent, Stack, Typography, Divider } from "@mui/material";
import { use, useMemo } from "react";
import { CalcWorkingHours } from "./CalcWorkingHours";
import { StoreOpenStatus } from "../StoreOpenStatus/StoreOpenStatus";
import { StoreRatingIndicator } from "../StoreRatingIndicator/StoreRatingIndicator";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";
import { GetStoreDetailsById } from "@/lib/controllers/stores";
import { StoreListItemCardMedia } from "./StoreListItemCardMedia";
import { StoreListItemCardActionArea } from "./StoreListItemCardActionArea";

/** One card in the list of stores */
export const StoresListItem = (props: { storeId: string }) => {
  // Localization
  const { locale, LL } = useServerLocalization();

  // Query the store details
  const storeInfo = use(GetStoreDetailsById(props.storeId));

  // Check if open now or when will open or close
  const hoursInfo = useMemo(
    () => CalcWorkingHours(locale, LL, storeInfo.workingHours),
    [locale, LL, storeInfo.workingHours]
  );

  // Show data card
  return (
    <Card
      sx={{
        overflow: "auto",
        containerType: "inline-size",
      }}
    >
      <StoreListItemCardActionArea storeId={storeInfo.id}>
        <StoreListItemCardMedia imageSrc={storeInfo.imageSrc} />
        <CardContent component={Stack} flexGrow={1}>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={2}
          >
            <Stack sx={{ flexGrow: 1 }}>
              <Typography variant="h5">{storeInfo.name}</Typography>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                {storeInfo.address}
              </Typography>
            </Stack>
            <StoreOpenStatus hoursInfo={hoursInfo} />
            <Divider orientation="vertical" flexItem />
            <StoreRatingIndicator
              rating={storeInfo.rating}
              countRatings={storeInfo.countRatings}
            />
          </Stack>
          <Divider />
          <Typography sx={{ color: "text.primary" }}>
            {storeInfo.description}
          </Typography>
        </CardContent>
      </StoreListItemCardActionArea>
    </Card>
  );
};
