import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { IStoreInfo } from "./StoreInfo";
import { useMemo } from "react";
import { useI18nContext } from "../../localization/i18n-react";
import { CalcWorkingHours } from "./CalcWorkingHours";

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

export const StoresListItem = (props: { storeInfo: IStoreInfo }) => {
  const { LL } = useI18nContext();

  // Check if open now or when will open or close
  const hoursInfo = useMemo(
    () => CalcWorkingHours(LL, props.storeInfo.workingHours),
    [LL, props.storeInfo.workingHours]
  );

  // Present the card
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
              <Typography variant="h5">{props.storeInfo.name}</Typography>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                {props.storeInfo.address}
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
                <Rating
                  name="read-only"
                  value={props.storeInfo.rating}
                  readOnly
                />
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary" }}
                >
                  ({props.storeInfo.countRatings})
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Typography sx={{ color: "text.primary" }}>
            {props.storeInfo.description}
          </Typography>
        </CardContent>
      </DynamicCard>
    </Box>
  );
};
