"use client";

import {
  useStoreReviewMutation,
  useStoreReviewsQuery,
} from "@/lib/hooks/useStoreReviews";
import { useI18nContext } from "@/lib/localization/i18n-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import { useAuthContext } from "../Providers/AuthProvider";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { IPostReviewRequestData } from "@/lib/schemas/dto/PostReviewRequest";

export function EditReviewDialog(props: {
  storeId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  // Localization
  const { LL } = useI18nContext();

  // API
  const authContext = useAuthContext();
  const reviewQuery = useStoreReviewsQuery(authContext?.token, props.storeId);
  const reviewMutation = useStoreReviewMutation(authContext?.token);

  // Internal logic
  const [reviewState, setReviewState] = useState<IPostReviewRequestData>({
    storeId: props.storeId,
    rating: 0,
    comment: "",
  });

  const onChangeRating = useCallback(
    (_: SyntheticEvent, value: number | null) =>
      setReviewState((prev) => ({
        ...prev,
        rating: value ?? 0,
      })),
    [setReviewState]
  );

  const onChangeComment = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) =>
      setReviewState((prev) => ({
        ...prev,
        comment: evt.target.value ?? "",
      })),
    [setReviewState]
  );

  const onSaveButton = useCallback(() => {
    reviewMutation.mutate(reviewState);
    props.onClose();
  }, [props, reviewState, reviewMutation]);

  useEffect(() => {
    setReviewState((prev) => {
      return {
        ...prev,
        rating: reviewQuery.data?.own?.rating || prev.rating,
        comment: reviewQuery.data?.own?.comment || prev.comment,
      };
    });
  }, [reviewQuery.data]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
    >
      <DialogTitle>{LL.Stores.AddReviewButton()}</DialogTitle>
      <DialogContent>
        <Stack>
          <Rating value={reviewState.rating} onChange={onChangeRating} />
          <TextField
            value={reviewState.comment}
            onChange={onChangeComment}
            multiline
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSaveButton}>{LL.Stores.SaveReview()}</Button>
      </DialogActions>
    </Dialog>
  );
}
