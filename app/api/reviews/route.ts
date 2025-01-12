import { postReviewRequestSchema } from "@/lib/schemas/dto/PostReviewRequest";
import { NextRequest, NextResponse } from "next/server";
import StatusCode from "status-code-enum";
import { getAuthorization } from "../utils/getAuthorization";
import {
  IGetReviewsResponseData,
  IReviewListItem,
} from "@/lib/schemas/dto/GetReviewsResponse";
import { IStoreReview, StoreReviewModel } from "@/lib/models/StoreReviewModel";
import { UserModel } from "@/lib/models/UserModel";
import { ConnectDatabase } from "@/lib/singleton/Database";

async function mapReview(review: IStoreReview): Promise<IReviewListItem> {
  const reviewerUser = await UserModel.findById(review.user);

  return {
    userName: reviewerUser?.firstName ?? "",
    date: review.timestamp,
    rating: review.rating,
    comment: review.comment,
  };
}

/** Returns a list of reviews */
export async function GET(req: NextRequest) {
  // Get the required store from the query URL
  const id = req.nextUrl.searchParams.get("id");

  if (!id)
    return new NextResponse(null, { status: StatusCode.ClientErrorBadRequest });

  // Validate authorization
  const userId = await getAuthorization(req);

  if (!userId)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorUnauthorized,
    });

  // Find own review
  await ConnectDatabase();
  const ownReview = await StoreReviewModel.findOne({
    store: id,
    user: userId,
  });

  // Find the most recent reviews
  const otherReviews = await StoreReviewModel.find({
    store: id,
  })
    .sort({ createdAt: -1 })
    .limit(10);

  const response: IGetReviewsResponseData = {
    own: ownReview ? await mapReview(ownReview) : undefined,
    others: await Promise.all(
      otherReviews.map(async (x) => await mapReview(x))
    ),
  };

  return NextResponse.json(response);
}

/** Posts a new review */
export async function POST(req: NextRequest) {
  // Validate the DTO
  const requestBody = await req.json();
  const { data, error, success } = await postReviewRequestSchema.safeParseAsync(
    requestBody
  );

  if (!success)
    return NextResponse.json(error, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Validate authorization
  const userId = await getAuthorization(req);

  if (!userId)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorUnauthorized,
    });

  // Remove previous review of this user
  await StoreReviewModel.findOneAndUpdate(
    {
      store: data.storeId,
      user: userId,
    },
    {
      rating: data.rating,
      comment: data.comment,
      timestamp: new Date(),
    },
    {
      upsert: true,
    }
  );

  // Post success
  return new NextResponse(null, { status: StatusCode.SuccessOK });
}
