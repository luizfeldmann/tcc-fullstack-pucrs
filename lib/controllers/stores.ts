import { StoreModel } from "../models/StoreModel";
import { StoreReviewModel } from "../models/StoreReviewModel";
import { IStoreDetailsResponseData } from "../schemas/dto/StoreDetailsResponse";
import { ConnectDatabase } from "../singleton/Database";

/** Returns a list of all stores */
export async function GetStoresList(): Promise<string[]> {
  await ConnectDatabase();
  const allStores = await StoreModel.find({});

  return allStores.map((store) => store._id.toString());
}

/** Returns a specific store */
export async function GetStoreDetailsById(
  id: string
): Promise<IStoreDetailsResponseData> {
  // Find the store in the database
  await ConnectDatabase();
  const store = await StoreModel.findOne({
    _id: id,
  });

  if (!store) return Promise.reject();

  // Calculate ratings
  const ratings = await StoreReviewModel.find({
    store: id,
  });

  const sumRatings = ratings.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.rating;
  }, 0);
  const rating = ratings.length > 0 ? sumRatings / ratings.length : 0;

  // Return details
  return {
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
}
