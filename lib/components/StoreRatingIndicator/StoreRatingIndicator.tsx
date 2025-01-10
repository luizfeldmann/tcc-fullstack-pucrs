import { Rating, Skeleton, Stack, Typography } from "@mui/material";

export function StoreRatingIndicator(props: {
  rating?: number;
  countRatings?: number;
}) {
  return (
    <Stack alignItems="center">
      {props.rating !== undefined ? (
        <Rating name="read-only" value={props.rating} readOnly />
      ) : (
        <Skeleton />
      )}
      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        {props.countRatings !== undefined ? props.countRatings : <Skeleton />}
      </Typography>
    </Stack>
  );
}
