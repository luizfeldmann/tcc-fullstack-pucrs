import { ConnectDatabase } from "@/lib/singleton/Database";
import { signupRequestSchema } from "@/lib/schemas/dto/SignupRequest";
import StatusCode from "status-code-enum";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "@/lib/models/UserModel";
import { EUserTokenPurpose, UserToken } from "@/lib/schemas/dto/UserToken";
import { emailTransporter } from "@/lib/singleton/app-mailer";
import { serverEnvironment } from "@/lib/constants/ServerEnvironment";
import { ERoutes } from "@/lib/constants/ERoutes";
import { mongo } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "node:url";

export async function POST(req: NextRequest) {
  // Validate DTO
  const payload = await req.json();
  const { data, error, success } = await signupRequestSchema.safeParseAsync(
    payload
  );

  if (!success)
    return NextResponse.json(error, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Hash user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Create the user in the database
  try {
    await ConnectDatabase();

    const { _id } = await UserModel.create({
      // The user starts as NOT verified
      verified: false,
      // User data from the DTO
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      passwordHashed: hashedPassword,
    });

    // Create a token to verify the user
    const payload: UserToken = {
      id: _id.toString(),
      purpose: EUserTokenPurpose.EVerifyAccount,
    };

    const jwtVerify = jsonwebtoken.sign(payload, serverEnvironment.JWT_PVT_KEY);

    // Send the verification email
    const verifyLink = new URL(req.url);
    verifyLink.pathname = ERoutes.Verify;
    verifyLink.searchParams.set("t", jwtVerify);

    await emailTransporter.sendMail({
      from: serverEnvironment.EMAIL_USER,
      to: data.emailAddress,
      subject: "Verify your account",
      text: `To verify your account please browse to ${verifyLink.href}`,
    });

    return new NextResponse(null, { status: StatusCode.SuccessCreated });
  } catch (reason) {
    if (reason instanceof mongo.MongoError && reason.code == 11000) {
      // Attempted to create duplicated user
      return NextResponse.json(reason, {
        status: StatusCode.ClientErrorConflict,
      });
    } else {
      // General error
      return NextResponse.json(reason, {
        status: StatusCode.ServerErrorInternal,
      });
    }
  }
}
