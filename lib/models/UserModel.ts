import mongoose, { Model } from "mongoose";

/** User data format */
export interface IUser {
  /** First name of the user */
  firstName: string;

  /** Last name of the user */
  lastName: string;

  /** Email address of the user */
  emailAddress: string;

  /** The user's password */
  passwordHashed: string;

  /** Indicates that the user account has been verified */
  verified: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  passwordHashed: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
});

/** ORM of user data in DB */
export const UserModel: Model<IUser> =
  mongoose.models?.Users || mongoose.model<IUser>("Users", userSchema);
