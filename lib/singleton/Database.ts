import mongoose, { Connection } from "mongoose";
import { serverEnvironment } from "../constants/ServerEnvironment";

let cachedConnection: Connection | null = null;

export async function ConnectDatabase() {
  if (cachedConnection) return cachedConnection;

  const cnx = await mongoose.connect(serverEnvironment.MONGO_URI);
  cachedConnection = cnx.connection;

  return cachedConnection;
}
