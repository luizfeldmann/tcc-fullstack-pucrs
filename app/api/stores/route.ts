import { StoreModel } from "@/lib/models/StoreModel";
import { IStoresListResponseData } from "@/lib/schemas/dto/StoresListResponse";
import { ConnectDatabase } from "@/lib/singleton/Database";
import { NextResponse } from "next/server";
import StatusCode from "status-code-enum";

/** Returns a list of all stores */
export async function GET() {
  await ConnectDatabase();
  const allStores = await StoreModel.find({});

  const storeIds = allStores.map((store) =>
    store._id.toString()
  ) satisfies IStoresListResponseData;

  return NextResponse.json(storeIds, { status: StatusCode.SuccessOK });
}
