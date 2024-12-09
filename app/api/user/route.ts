import { NextRequest, NextResponse } from "next/server";
import { getAuthorization } from "../utils/getAuthorization";
import StatusCode from "status-code-enum";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { UserModel } from "@/lib/models/UserModel";
import { IUserAccountInfoResponseData } from "@/lib/schemas/dto/UserAccountInfoResponse";
import { userAccountBasicInfoUpdateRequestSchema } from "@/lib/schemas/dto/UserAccountInfoUpdateRequest";

/** Returns information of an user select by ID */
export async function GET(req: NextRequest) {
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

  // Returns only a subset of the user information on the database
  const userInfoResponse: IUserAccountInfoResponseData = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
  };

  return NextResponse.json(userInfoResponse);
}

/** Request to update user's basic information */
export async function POST(req: NextRequest) {
  // Validate the DTO
  const requestBody = await req.json();
  const { data, error, success } =
    await userAccountBasicInfoUpdateRequestSchema.safeParseAsync(requestBody);

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

  // Search for the user with the logged ID
  await ConnectDatabase();
  const user = await UserModel.findById(id);

  // If the user does not exist ...
  if (!user)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorNotFound,
    });

  // Update received information
  if (data.firstName) user.firstName = data.firstName;

  if (data.lastName) user.lastName = data.lastName;

  // Save the updates
  await user.save();

  // Reply success
  return new NextResponse(null, { status: StatusCode.SuccessOK });
}
