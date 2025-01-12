import { StoreModel } from "@/lib/models/StoreModel";
import { StoreReviewModel } from "@/lib/models/StoreReviewModel";
import { IStoreDetailsResponseData } from "@/lib/schemas/dto/StoreDetailsResponse";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { NextRequest, NextResponse } from "next/server";
import StatusCode from "status-code-enum";

/** Returns a specific store */
export async function GET(req: NextRequest) {
  // Get the required store from the query URL
  const id = req.nextUrl.searchParams.get("id");

  if (!id)
    return new NextResponse(null, { status: StatusCode.ClientErrorBadRequest });

  // Find the store in the database
  await ConnectDatabase();
  const store = await StoreModel.findOne({
    _id: id,
  });

  if (!store)
    return new NextResponse(null, { status: StatusCode.ClientErrorNotFound });

  // Calculate ratings
  const ratings = await StoreReviewModel.find({
    store: id,
  });

  const sumRatings = ratings.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.rating;
  }, 0);
  const rating = ratings.length > 0 ? sumRatings / ratings.length : 0;

  // Return details
  const storeInfo: IStoreDetailsResponseData = {
    id: store._id.toString(),
    name: store.name,
    address: store.address,
    imageSrc: store.imageSrc,
    description: store.description,
    rating,
    countRatings: ratings.length,
    workingHours: store.workingHours.map((hour) => ({
      weekday: hour.weekday,
      opens: hour.opens,
      closes: hour.closes,
    })),
  };

  return NextResponse.json(storeInfo, { status: StatusCode.SuccessOK });
}
