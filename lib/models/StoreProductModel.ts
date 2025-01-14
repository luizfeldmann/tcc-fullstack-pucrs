import mongoose, { Model, ObjectId } from "mongoose";
import { StoreModel } from "./StoreModel";

/** Information of one product in the store */
export interface IStoreProduct {
  /** The store where this product is sold */
  store: ObjectId;

  /** Name of the product */
  name: string;

  /** Description of the product */
  description: string;

  /** URLs to the image sources */
  imageSrc: string[];

  /** Unit price */
  price: number;
}

const storeProductSchema = new mongoose.Schema<IStoreProduct>({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: StoreModel.modelName,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: { type: [String], required: true },
  price: { type: Number, required: true },
});

/** ORM of the products in the store */
export const StoreProductModel: Model<IStoreProduct> =
  mongoose.models?.StoreProducts ||
  mongoose.model<IStoreProduct>("StoreProducts", storeProductSchema);
