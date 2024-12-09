import {
  ITransactionResponseItemData,
  ITransactionsResponseData,
  transactionsRequestSchema,
} from "@/lib/schemas/dto/TransactionsRequestResponse";
import { NextRequest, NextResponse } from "next/server";
import { getAuthorization } from "../utils/getAuthorization";
import StatusCode from "status-code-enum";
import mongoose from "mongoose";
import { TransactionsModel } from "@/lib/models/TransactionModel";
import { ConnectDatabase } from "@/lib/singleton/Database";

/** Reads all the user's transactions */
export async function POST(req: NextRequest) {
  // Validate the DTO
  const requestBody = await req.json();
  const { data, error, success } =
    await transactionsRequestSchema.safeParseAsync(requestBody);

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

  // Get all transactions with pagination
  const query = {
    user: new mongoose.Types.ObjectId(id),
  };

  await ConnectDatabase();
  const resultsItems = await TransactionsModel.find(query)
    .sort({
      time: -1,
    })
    .skip(data.skip)
    .limit(data.limit)
    .exec();

  if (resultsItems === null)
    return NextResponse.json(error, {
      status: StatusCode.ClientErrorBadRequest,
    });

  // Count total items
  const resultsCount = await TransactionsModel.countDocuments(query);

  // Response
  const respData: ITransactionsResponseData = {
    count: resultsCount,
    items: resultsItems.map((item): ITransactionResponseItemData => {
      return {
        _id: item.id,
        time: item.time,
        amount: item.amount,
        type: item.type,
      };
    }),
  };

  return NextResponse.json(respData, { status: StatusCode.SuccessOK });
}
