/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { CalcWorkingHours } from "../StoresList/CalcWorkingHours";
import { use, useMemo } from "react";
import { StoreOpenStatus } from "../StoreOpenStatus/StoreOpenStatus";
import { StoreRatingIndicator } from "../StoreRatingIndicator/StoreRatingIndicator";
import { StoreWorkingHoursTable } from "../StoreWorkingHoursTable/StoreWorkingHoursTable";
import { ExpandMore } from "@mui/icons-material";
import { StoreReviewsList } from "../StoreReviewsList/StoreReviewsList";
import { useServerLocalization } from "@/lib/hooks/useServerLocalization";
import { GetStoreDetailsById } from "@/lib/controllers/stores";
import { EditReviewAccordion } from "./EditReviewAccordion";

export function StoreDetails(props: { id: string }) {
  // Localization
  const { locale, LL } = useServerLocalization();

  // Query the store details
  const storeInfo = use(GetStoreDetailsById(props.id));

  // Check if open now or when will open or close
  const hoursInfo = useMemo(
    () => CalcWorkingHours(locale, LL, storeInfo.workingHours),
    [locale, LL, storeInfo.workingHours]
  );

  return (
    <>
      <Stack direction="row" flexWrap="wrap">
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="h4">{storeInfo.name}</Typography>
          <Typography variant="h5">{storeInfo.address}</Typography>
        </Stack>
        <StoreOpenStatus hoursInfo={hoursInfo} />
        <StoreRatingIndicator
          rating={storeInfo.rating}
          countRatings={storeInfo.countRatings}
        />
      </Stack>

      <Divider />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Stores.DescriptionTitle()}
        </AccordionSummary>
        <AccordionDetails>{storeInfo.description}</AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Stores.ImagesTitle()}
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={1}>
            <ImageListItem>
              <img src={storeInfo.imageSrc || ""} alt="" />
            </ImageListItem>
          </ImageList>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Stores.WorkingHoursTitle()}
        </AccordionSummary>
        <AccordionDetails>
          <StoreWorkingHoursTable
            locale={locale}
            workingHours={storeInfo.workingHours ?? []}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Stores.ReviewsTitle()}
        </AccordionSummary>
        <AccordionDetails>
          <StoreReviewsList storeId={props.id} />
        </AccordionDetails>
        <EditReviewAccordion storeId={props.id} />
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Stores.ProductsTitle()}
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  );
}
