"use client";

import { useStoreDetailQuery } from "@/lib/hooks/useStoreDetailQuery";
import { useI18nContext } from "@/lib/localization/i18n-react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { CalcWorkingHours } from "../StoresList/CalcWorkingHours";
import { useMemo, useState } from "react";
import { StoreOpenStatus } from "../StoreOpenStatus/StoreOpenStatus";
import { StoreRatingIndicator } from "../StoreRatingIndicator/StoreRatingIndicator";
import { StoreWorkingHoursTable } from "../StoreWorkingHoursTable/StoreWorkingHoursTable";
import { EditReviewDialog } from "../EditReviewDialog/EditReviewDialog";
import { ExpandMore } from "@mui/icons-material";
import { StoreReviewsList } from "../StoreReviewsList/StoreReviewsList";
import Image from "next/image";

export function StoreDetails(props: { id: string }) {
  // Localization
  const { locale, LL } = useI18nContext();

  // Query the store details
  const storeInfo = useStoreDetailQuery(props.id);

  // Dialog management
  const [reviewEditorIsOpen, reviewEditorSetOpen] = useState(false);

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
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Stores.DescriptionTitle()}
        </AccordionSummary>
        <AccordionDetails>{storeInfo.data?.description}</AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {LL.Stores.ImagesTitle()}
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={1}>
            <ImageListItem>
              <Image src={storeInfo.data?.imageSrc || ""} alt="" />
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
            workingHours={storeInfo.data?.workingHours ?? []}
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
        <AccordionActions>
          <Button onClick={() => reviewEditorSetOpen(true)}>
            {LL.Stores.AddReviewButton()}
          </Button>
        </AccordionActions>
        <EditReviewDialog
          storeId={props.id}
          isOpen={reviewEditorIsOpen}
          onClose={() => reviewEditorSetOpen(false)}
        />
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
