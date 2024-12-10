import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appAxios, withAuthorizationHeader } from "../singleton/app-axios";
import { userAccountInfoQueryKey } from "./useAccountInfoQuery";
import { IUserAccountBasicInfoUpdateRequestData } from "../schemas/dto/UserAccountInfoUpdateRequest";

/** Updates user account info */
export const useAccountInfoMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUserAccountBasicInfoUpdateRequestData) => {
      return appAxios.post(userAccountInfoQueryKey, data, {
        headers: {
          ...withAuthorizationHeader(token),
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [userAccountInfoQueryKey],
      });
    },
  });
};
