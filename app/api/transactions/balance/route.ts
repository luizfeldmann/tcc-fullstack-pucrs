import { NextRequest, NextResponse } from "next/server";
import { getAuthorization } from "../../utils/getAuthorization";
import StatusCode from "status-code-enum";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { ITransaction, TransactionsModel } from "@/lib/models/TransactionModel";
import mongoose from "mongoose";
import { IBalanceResponseData } from "@/lib/schemas/dto/BalanceResponse";

function propertyOf<TObj>(name: keyof TObj) {
  return `$${String(name)}`;
}

/** Calculates the user's balance */
export async function GET(req: NextRequest) {
  // Validate authorization
  const id = await getAuthorization(req);

  if (!id)
    return new NextResponse(null, {
      status: StatusCode.ClientErrorUnauthorized,
    });

  // Find the balance by aggregating all transactions
  await ConnectDatabase();
  const result = await TransactionsModel.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(id) } },
    {
      $group: {
        _id: null,
        balance: { $sum: propertyOf<ITransaction>("amount") },
      },
    },
  ]);

  const balance = result.length > 0 ? result[0].balance : 0;

  // Response
  const respData: IBalanceResponseData = {
    balance,
  };

  return NextResponse.json(respData, { status: StatusCode.SuccessOK });
}
