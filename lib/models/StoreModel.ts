import mongoose, { Model, ObjectId } from "mongoose";
import { UserModel } from "./UserModel";

/** Maps opening and closing hours of a store */
export interface IWorkingHours {
  /** Day of the week refered by this element */
  weekday: number;
  /** Hour when this store opens */
  opens: number;
  /** Hour when this store closes */
  closes: number;
}

const workingHoursSchema = new mongoose.Schema<IWorkingHours>({
  weekday: { type: Number, min: 0, max: 7, required: true },
  opens: { type: Number, min: 0, max: 24, required: true },
  closes: { type: Number, min: 0, max: 24, required: true },
});

/** Describes one rating given by one user */
export interface IStoreRating {
  user: ObjectId;
  rating: number;
}

const userStoreRating = new mongoose.Schema<IStoreRating>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModel.modelName,
  },
  rating: { type: Number, required: true },
});

/** Store information */
export interface IStore {
  /** Name of the store */
  name: string;

  /** Address line */
  address: string;

  /** URL of the image */
  imageSrc: string;

  /** General description of the store */
  description: string;

  /** Number of ratings given */
  ratings: IStoreRating[];

  /** When the store opens or closes */
  workingHours: IWorkingHours[];
}

const storeSchema = new mongoose.Schema<IStore>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  imageSrc: { type: String, required: true },
  description: { type: String, required: true },
  ratings: { type: [userStoreRating], required: true },
  workingHours: { type: [workingHoursSchema], required: true },
});

/** ORM of the store */
export const StoreModel: Model<IStore> =
  mongoose.models?.Stores || mongoose.model<IStore>("Stores", storeSchema);
