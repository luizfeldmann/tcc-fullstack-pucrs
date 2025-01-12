"use client";

import { AccordionActions, Button } from "@mui/material";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { useState } from "react";
import { EditReviewDialog } from "../EditReviewDialog/EditReviewDialog";

export function EditReviewAccordion(props: { storeId: string }) {
  const { LL } = useI18nContext();
  const [reviewEditorIsOpen, reviewEditorSetOpen] = useState(false);

  return (
    <>
      <AccordionActions>
        <Button onClick={() => reviewEditorSetOpen(true)}>
          {LL.Stores.AddReviewButton()}
        </Button>
      </AccordionActions>
      <EditReviewDialog
        storeId={props.storeId}
        isOpen={reviewEditorIsOpen}
        onClose={() => reviewEditorSetOpen(false)}
      />
    </>
  );
}
