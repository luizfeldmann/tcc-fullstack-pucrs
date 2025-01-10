"use client";

import { useStoreDetailQuery } from "@/lib/hooks/useStoreDetailQuery";
import { useI18nContext } from "@/lib/localization/i18n-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { CalcWorkingHours } from "../StoresList/CalcWorkingHours";
import { useMemo } from "react";
import { StoreOpenStatus } from "../StoreOpenStatus/StoreOpenStatus";
import { StoreRatingIndicator } from "../StoreRatingIndicator/StoreRatingIndicator";
import { StoreWorkingHoursTable } from "../StoreWorkingHoursTable/StoreWorkingHoursTable";

export function StoreDetails(props: { id: string }) {
  // Localization
  const { locale, LL } = useI18nContext();

  // Query the store details
  const storeInfo = useStoreDetailQuery(props.id);

  // Check if open now or when will open or close
  const hoursInfo = useMemo(
    () => CalcWorkingHours(locale, LL, storeInfo.data?.workingHours),
    [locale, LL, storeInfo.data?.workingHours]
  );

  return (
    <>
      <Stack direction="row" flexWrap="wrap">
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="h4">{storeInfo.data?.name}</Typography>
          <Typography variant="h5">{storeInfo.data?.address}</Typography>
        </Stack>
        <StoreOpenStatus hoursInfo={hoursInfo} />
        <StoreRatingIndicator
          rating={storeInfo.data?.rating}
          countRatings={storeInfo.data?.countRatings}
        />
      </Stack>
      <Divider />
      <Accordion defaultExpanded>
        <AccordionSummary>{LL.Stores.DescriptionTitle()}</AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">{storeInfo.data?.description}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>{LL.Stores.ImagesTitle()}</AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>{LL.Stores.WorkingHoursTitle()}</AccordionSummary>
        <AccordionDetails>
          <StoreWorkingHoursTable
            locale={locale}
            workingHours={storeInfo.data?.workingHours ?? []}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>{LL.Stores.ReviewsTitle()}</AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>{LL.Stores.ProductsTitle()}</AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  );
}
