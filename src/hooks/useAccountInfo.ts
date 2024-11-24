import { z } from "zod";
import { appAxios, withAuthorizationHeader } from "../app-axios";
import { queryClient } from "../app-query";
import { useMutation, useQuery } from "@tanstack/react-query";

/** Query key for the user info */
const userQueryKey: string = "/user";

/** Schema to extract the user info from the response */
const userInfoSchema = z.object({
  emailAddress: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

/** Type of retrieved user information */
export type IUserInfo = z.infer<typeof userInfoSchema>;

/** Requests the balance from the server */
const requestUserInfo = (token: string): Promise<IUserInfo> => {
  return appAxios
    .get(userQueryKey, {
      headers: {
        ...withAuthorizationHeader(token),
      },
    })
    .then((resp) => {
      const { data, success } = userInfoSchema.safeParse(resp.data);

      if (!success) return Promise.reject();

      return data;
    })
    .catch(() => {
      return Promise.reject();
    });
};

/** Notifies that the user info query is now invalid */
export const invalidateBalanceQuery = () => {
  queryClient.invalidateQueries({
    queryKey: [userQueryKey],
  });
};

/** Query reads user account info */
export const useAccountInfoQuery = (
  token: string,
  select?: (data: IUserInfo) => IUserInfo
) => {
  return useQuery(
    {
      queryKey: [userQueryKey],
      queryFn: async () => {
        return await requestUserInfo(token);
      },
      select: select,
    },
    queryClient
  );
};

/** The mutable properties of the user account */
export interface IUserAccountInfoMutation {
  firstName?: string;
  lastName?: string;
}

/** Query updates user account info */
export const useAccountInfoMutation = (token: string) => {
  return useMutation(
    {
      mutationFn: (data: IUserAccountInfoMutation) => {
        return appAxios.post(userQueryKey, data, {
          headers: {
            ...withAuthorizationHeader(token),
          },
        });
      },
      onSettled: () => {
        invalidateBalanceQuery();
      },
    },
    queryClient
  );
};
