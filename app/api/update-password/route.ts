import { userUpdatePasswordRequestSchema } from "@/lib/schemas/dto/UserPasswordUpdateRequest";
import { NextRequest, NextResponse } from "next/server";
import { getAuthorization } from "../utils/getAuthorization";
import StatusCode from "status-code-enum";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { UserModel } from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";

/** Changes a known old password for a new password */
export async function POST(req: NextRequest) {
  // Validate the DTO
  const requestBody = await req.json();
  const { data, error, success } =
    await userUpdatePasswordRequestSchema.safeParseAsync(requestBody);

  if (!success)
    return NextResponse.json(error, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Validate authorization
  const id = await getAuthorization(req);

  if (!id)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorUnauthorized,
    });

  // Find the required user in the database
  await ConnectDatabase();
  const user = await UserModel.findById(id);

  // If the user does not exist ...
  if (!user)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorNotFound,
    });

  // Verify the old password matches
  const passwordMatch = await bcrypt.compare(
    data.oldPassword,
    user.passwordHashed
  );

  if (!passwordMatch)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorUnauthorized,
    });

  // Store the new password
  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(data.newPassword, salt);

  user.passwordHashed = newHashedPassword;
  await user.save();

  // Return success
  return new NextResponse(null, {
    status: StatusCode.SuccessOK,
  });
}
