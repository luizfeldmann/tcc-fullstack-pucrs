import mongoose, { Model } from "mongoose";

/** Redeemable code data format */
export interface IRedeemable {
  /** The code used to claim this redeemable */
  code: string;

  /** The amount credited when this code is claimed */
  credit: number;

  /** How many this this same code may be used */
  maximumUses: number;

  /** Date when this code expires */
  expiration: Date;
}

const redeemablesSchema = new mongoose.Schema<IRedeemable>({
  code: { type: String, required: true, unique: true },
  credit: { type: Number, required: true },
  maximumUses: { type: Number, required: true, default: Infinity },
  expiration: { type: Date, required: true },
});

/** ORM of the redeemable codes in DB */
export const RedeemableModel: Model<IRedeemable> =
  mongoose.models?.Redeemables ||
  mongoose.model<IRedeemable>("Redeemables", redeemablesSchema);
