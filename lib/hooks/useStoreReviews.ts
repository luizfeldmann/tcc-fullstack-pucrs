import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsResponseSchema,
  IGetReviewsResponseData,
} from "@/lib/schemas/dto/GetReviewsResponse";
import { appAxios, withAuthorizationHeader } from "../singleton/app-axios";
import { IPostReviewRequestData } from "../schemas/dto/PostReviewRequest";

/** Query key for the reviews */
export const storeReviewsQueryKey: string = "/reviews";

/** Reads own and other reviews */
export const useStoreReviewsQuery = (
  token: string | undefined,
  storeId: string
) => {
  return useQuery<IGetReviewsResponseData>({
    queryKey: [storeReviewsQueryKey, storeId],
    queryFn: async () => {
      if (!token) return Promise.reject();

      const resp = await appAxios.get(`${storeReviewsQueryKey}?id=${storeId}`, {
        headers: {
          ...withAuthorizationHeader(token),
        },
      });

      return await getReviewsResponseSchema.parseAsync(resp.data);
    },
  });
};

/** Posts own review */
export const useStoreReviewMutation = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IPostReviewRequestData) => {
      if (!token) return Promise.reject();

      return appAxios.post(storeReviewsQueryKey, data, {
        headers: {
          ...withAuthorizationHeader(token),
        },
      });
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [storeReviewsQueryKey, variables.storeId],
      });
    },
  });
};
