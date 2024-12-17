import { z } from "zod";

/** Schema to extract the list of stores from the response */
export const storesListResponseSchema = z.string().array();

/** Data of the stores list query */
export type IStoresListResponseData = z.infer<typeof storesListResponseSchema>;
