"use client";

import { useStoreReviewsQuery } from "@/lib/hooks/useStoreReviews";
import { useAuthContext } from "../Providers/AuthProvider";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { IReviewListItem } from "@/lib/schemas/dto/GetReviewsResponse";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { useMemo } from "react";

function StoreReviewCard(props: { data: IReviewListItem }) {
  const { locale } = useI18nContext();

  const dateFmt = useMemo(
    () =>
      Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale]
  );

  return (
    <Card>
      <CardHeader
        avatar={<Rating value={props.data.rating} readOnly />}
        title={props.data.userName}
        subheader={dateFmt.format(props.data.date)}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.data.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function StoreReviewsList(props: { storeId: string }) {
  const { LL } = useI18nContext();

  const authContext = useAuthContext();
  const reviewQuery = useStoreReviewsQuery(authContext?.token, props.storeId);

  if (reviewQuery.isLoading) return <Skeleton />;

  if (reviewQuery.isSuccess && reviewQuery.data.others.length === 0)
    return <Alert severity="info">{LL.Stores.NoReviews()}</Alert>;

  return (
    <Stack spacing={2}>
      {reviewQuery.data?.others.map((r, index) => (
        <StoreReviewCard key={index} data={r} />
      ))}
    </Stack>
  );
}
