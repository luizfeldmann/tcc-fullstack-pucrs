import { NextRequest, NextResponse } from "next/server";
import { getAuthorization } from "../utils/getAuthorization";
import StatusCode from "status-code-enum";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { UserModel } from "@/lib/models/UserModel";
import { IUserAccountInfoResponseData } from "@/lib/schemas/dto/UserAccountInfoResponse";

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
