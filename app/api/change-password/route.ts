import { serverEnvironment } from "@/lib/constants/ServerEnvironment";
import { changePasswordRequestSchema } from "@/lib/schemas/dto/ChangePasswordRequest";
import { NextRequest, NextResponse } from "next/server";
import StatusCode from "status-code-enum";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  EUserTokenPurpose,
  UserTokenSchema,
} from "@/lib/schemas/dto/UserToken";
import { UserModel } from "@/lib/models/UserModel";
import { ConnectDatabase } from "@/lib/singleton/Database";

/** Handles a request to set a new password - after the user clicks the link in the email */
export async function POST(req: NextRequest) {
  // Validate DTO
  const requestBody = await req.json();
  const {
    data: requestData,
    error: requestError,
    success: requestSuccess,
  } = await changePasswordRequestSchema.safeParseAsync(requestBody);

  if (!requestSuccess)
    return NextResponse.json(requestError, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Try to extract the token from the JWT encoded string
  try {
    const jwtPayload = jsonwebtoken.verify(
      requestData.token,
      serverEnvironment.JWT_PVT_KEY
    );

    // Parse the token into our data format
    const {
      data: jwtData,
      error: jwtError,
      success: jwtSuccess,
    } = UserTokenSchema.safeParse(jwtPayload);

    if (!jwtSuccess)
      return NextResponse.json(jwtError, {
        status: StatusCode.ClientErrorBadRequest,
      });

    // To token must be issued for this purpose
    if (jwtData.purpose !== EUserTokenPurpose.EResetPassword)
      return new NextResponse(null, {
        status: StatusCode.ClientErrorUnauthorized,
      });

    // Try to find the user in the database
    await ConnectDatabase();
    const foundUser = await UserModel.findOne({
      _id: jwtData.id,
    });

    if (foundUser === null)
      return new NextResponse(null, {
        status: StatusCode.ClientErrorNotFound,
      });

    // Store the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(requestData.password, salt);

    foundUser.passwordHashed = hashedPassword;
    foundUser.verified = true;
    await foundUser.save();

    // Reply success
    return new NextResponse(null, { status: StatusCode.SuccessOK });
  } catch (err) {
    return NextResponse.json(err, {
      status: StatusCode.ClientErrorUnauthorized,
    });
  }
}
