import {
  EUserTokenPurpose,
  UserTokenSchema,
} from "@/lib/schemas/dto/UserToken";
import { NextRequest } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { serverEnvironment } from "@/lib/constants/ServerEnvironment";

export async function getAuthorization(
  req: NextRequest
): Promise<string | undefined> {
  // Read the token from the authorization header
  const authToken = req.headers.get("Authorization")?.split(" ").at(1);

  if (!authToken) return undefined;

  try {
    // Validate the JWT
    const verifResult = await jsonwebtoken.verify(
      authToken,
      serverEnvironment.JWT_PVT_KEY
    );

    // Parse the token
    const jwtPayload = await UserTokenSchema.parseAsync(verifResult);

    if (jwtPayload.purpose == EUserTokenPurpose.ELogin) return jwtPayload.id;
  } catch {}

  return undefined;
}
