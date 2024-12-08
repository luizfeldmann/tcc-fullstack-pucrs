import { UserModel } from "@/lib/models/UserModel";
import { forgotPasswordRequestSchema } from "@/lib/schemas/dto/ForgotPasswordRequest";
import { EUserTokenPurpose, UserToken } from "@/lib/schemas/dto/UserToken";
import { NextRequest, NextResponse } from "next/server";
import StatusCode from "status-code-enum";
import jsonwebtoken from "jsonwebtoken";
import { serverEnvironment } from "@/lib/constants/ServerEnvironment";
import { emailTransporter } from "@/lib/singleton/app-mailer";
import { ERoutes } from "@/lib/constants/ERoutes";
import { ConnectDatabase } from "@/lib/singleton/Database";

/** Handles a password recovery request - sends an e-mail with reset instructions */
export async function POST(req: NextRequest) {
  // Validate DTO
  const requestBody = await req.json();
  const { data, error, success } =
    await forgotPasswordRequestSchema.safeParseAsync(requestBody);

  if (!success)
    return NextResponse.json(error, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Find the user with such email
  await ConnectDatabase();
  const foundUser = await UserModel.findOne({
    // Use email from the request DTO
    emailAddress: data.emailAddress,
  });

  if (foundUser === null)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorNotFound,
    });

  // Create a token authorizing the password reset
  const payload: UserToken = {
    id: foundUser.id,
    purpose: EUserTokenPurpose.EResetPassword,
  };
  const jwtReset = jsonwebtoken.sign(payload, serverEnvironment.JWT_PVT_KEY, {
    expiresIn: "1h",
  });

  // Send the email with the link to change the password
  const changeLink = new URL(req.url);
  changeLink.pathname = ERoutes.ChangePassword;
  changeLink.searchParams.set("t", jwtReset);

  await emailTransporter.sendMail({
    from: serverEnvironment.EMAIL_USER,
    to: foundUser.emailAddress,
    subject: "Recover your account",
    text: `To change your password, please browse to ${changeLink.href}`,
  });

  return new NextResponse(null, { status: StatusCode.SuccessOK });
}
