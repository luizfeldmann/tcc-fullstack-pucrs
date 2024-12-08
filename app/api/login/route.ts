import { UserModel } from "@/lib/models/UserModel";
import {
  ILoginResponseData,
  loginRequestSchema,
} from "@/lib/schemas/dto/LoginRequestResponse";
import { NextRequest, NextResponse } from "next/server";
import StatusCode from "status-code-enum";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { EUserTokenPurpose, UserToken } from "@/lib/schemas/dto/UserToken";
import { serverEnvironment } from "@/lib/constants/ServerEnvironment";
import { ConnectDatabase } from "@/lib/singleton/Database";

/** Endpoint handling authenticating a user */
export async function POST(req: NextRequest) {
  // Validate DTO
  const requestPayload = await req.json();
  const { data, error, success } = await loginRequestSchema.safeParseAsync(
    requestPayload
  );

  if (!success)
    return NextResponse.json(error, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Search for the user with the given email
  await ConnectDatabase();
  const foundUser = await UserModel.findOne({
    // Use email and password from the request DTO
    emailAddress: data.emailAddress,
  });

  if (foundUser === null)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorNotFound,
    });

  // Verify the password matches
  const passwordMatch = await bcrypt.compare(
    data.password,
    foundUser.passwordHashed
  );

  if (!passwordMatch)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorUnauthorized,
    });

  // Check the user has been verified
  if (!foundUser.verified)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorForbidden,
    });

  // Create an authorization token for the user
  const tokenPayload: UserToken = {
    id: foundUser.id,
    purpose: EUserTokenPurpose.ELogin,
  };
  const jwtLogin = jsonwebtoken.sign(
    tokenPayload,
    serverEnvironment.JWT_PVT_KEY,
    {
      expiresIn: "1h",
    }
  );

  // Success response
  const loginResponse: ILoginResponseData = {
    token: jwtLogin,
  };

  return NextResponse.json(loginResponse, { status: StatusCode.SuccessOK });
}
