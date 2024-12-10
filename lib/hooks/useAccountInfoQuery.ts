import { useQuery } from "@tanstack/react-query";
import {
  IUserAccountInfoResponseData,
  userAccountInfoResponseSchema,
} from "../schemas/dto/UserAccountInfoResponse";
import { appAxios, withAuthorizationHeader } from "../singleton/app-axios";

/** Query key for the user info */
export const userAccountInfoQueryKey: string = "/user";

/** Query reads user account info */
export const useAccountInfoQuery = (
  token: string,
  select?: (data: IUserAccountInfoResponseData) => IUserAccountInfoResponseData
) => {
  return useQuery({
    queryKey: [userAccountInfoQueryKey],
    queryFn: async () => {
      const resp = await appAxios.get(userAccountInfoQueryKey, {
        headers: {
          ...withAuthorizationHeader(token),
        },
      });

      return await userAccountInfoResponseSchema.parseAsync(resp.data);
    },
    select: select,
  });
};
