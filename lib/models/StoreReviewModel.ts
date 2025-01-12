import mongoose, { Model, ObjectId } from "mongoose";
import { UserModel } from "./UserModel";
import { StoreModel } from "./StoreModel";

/** Describes one rating given by one user */
export interface IStoreReview {
  store: ObjectId;
  user: ObjectId;
  timestamp: Date;
  rating: number;
  comment: string;
}

const storeReview = new mongoose.Schema<IStoreReview>({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: StoreModel.modelName,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModel.modelName,
  },
  timestamp: { type: Date, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

/** ORM of the store */
export const StoreReviewModel: Model<IStoreReview> =
  mongoose.models?.StoreReviews ||
  mongoose.model<IStoreReview>("StoreReviews", storeReview);
