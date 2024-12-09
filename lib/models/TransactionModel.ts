import mongoose, { ObjectId } from "mongoose";
import { UserModel } from "./UserModel";
import { RedeemableModel } from "./RedeemableModel";
import { ETransactionType } from "../schemas/dto/ETransactionType";

/** Represents the input or output of balance in an account */
export interface ITransaction {
  /** User who performed the transaction */
  user: ObjectId;

  /** Type of this transaction */
  type: ETransactionType;

  /** Time when this transaction occurred */
  time: Date;

  /** The balance added (+) or subtracted (-) from the account */
  amount: number;

  /** Links to a redeem code */
  redeemCode: ObjectId;
}

/** ORM of the transactions codes in DB */
export const TransactionsModel = mongoose.model<ITransaction>(
  "transactions",
  new mongoose.Schema<ITransaction>({
    /** General transaction data */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: UserModel.modelName,
    },
    type: { type: String, enum: ETransactionType, required: true },
    time: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true, default: 0 },
    /** Data specific per transaction type */
    redeemCode: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: RedeemableModel.modelName,
    },
  })
);
