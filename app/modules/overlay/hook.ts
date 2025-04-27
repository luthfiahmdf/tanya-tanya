import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getOverlay } from "./api";
import { TActiveOverlay } from "./type";

export const useGetOverlay = (
  username: string
): UseQueryResult<TActiveOverlay> => {
  return useQuery({
    queryKey: ["question", username],
    queryFn: async () => await getOverlay(username),
  });
};
