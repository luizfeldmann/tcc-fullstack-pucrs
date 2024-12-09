import { NextRequest, NextResponse } from "next/server";
import { getAuthorization } from "../../utils/getAuthorization";
import StatusCode from "status-code-enum";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { redeemCodeRequestSchema } from "@/lib/schemas/dto/RedeemCodeRequest";
import { RedeemableModel } from "@/lib/models/RedeemableModel";
import { TransactionsModel } from "@/lib/models/TransactionModel";
import { ETransactionType } from "@/lib/schemas/dto/ETransactionType";

/** Uses a gift card or promotional code to add balance to a user account */
export async function POST(req: NextRequest) {
  // Validate the DTO
  const requestBody = await req.json();
  const { data, error, success } = await redeemCodeRequestSchema.safeParseAsync(
    requestBody
  );

  if (!success)
    return NextResponse.json(error, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Validate authorization
  const userId = await getAuthorization(req);

  if (!userId)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorUnauthorized,
    });

  // Try to find the given code
  await ConnectDatabase();
  const redeemable = await RedeemableModel.findOne({
    code: data.redeemCode,
  });

  // Code does not exist
  if (redeemable === null)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorNotFound,
    });

  // Check it's not expired
  const dtNow = new Date();
  if (dtNow > redeemable.expiration)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorGone,
    });

  // Check if has not been used over the limit
  const usedCount = await TransactionsModel.countDocuments({
    type: ETransactionType.ERedeemCode,
    redeemCode: redeemable._id,
  });

  if (usedCount >= redeemable.maximumUses)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorGone,
    });

  // Check the same has not previously claimed the same code
  const claimedAlready = await TransactionsModel.exists({
    type: ETransactionType.ERedeemCode,
    user: userId,
    redeemCode: redeemable._id,
  });

  if (claimedAlready)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorGone,
    });

  // Register the transaction
  await TransactionsModel.create({
    user: userId,
    type: ETransactionType.ERedeemCode,
    amount: redeemable.credit,
    redeemCode: redeemable._id,
  });

  // Success
  return new NextResponse(null, {
    status: StatusCode.SuccessOK,
  });
}
