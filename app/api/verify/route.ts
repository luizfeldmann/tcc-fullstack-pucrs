import { verifyAccountRequestSchema } from "@/lib/schemas/dto/VerifyAccountRequest";
import { NextRequest, NextResponse } from "next/server";
import StatusCode from "status-code-enum";
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import { serverEnvironment } from "@/lib/constants/ServerEnvironment";
import {
  EUserTokenPurpose,
  UserTokenSchema,
} from "@/lib/schemas/dto/UserToken";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { UserModel } from "@/lib/models/UserModel";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Validate DTO
  const requestBody = await req.json();
  const {
    data: requestData,
    error: requestError,
    success: requestSuccess,
  } = await verifyAccountRequestSchema.safeParseAsync(requestBody);

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
    if (jwtData.purpose !== EUserTokenPurpose.EVerifyAccount)
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

    // Update the 'verified' state in the DB
    foundUser.verified = true;
    await foundUser.save();

    // Reply success
    return new NextResponse(null, {
      status: StatusCode.SuccessOK,
    });
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return new NextResponse(null, {
        status: StatusCode.ClientErrorUnauthorized,
      });
    } else {
      return new NextResponse(null, {
        status: StatusCode.ServerErrorInternal,
      });
    }
  }
}
