import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { TOverlaySettings, TUpdateOverlaySettings } from "./type";
import { getOverlaySettings, updateOverlaySettings } from "./api";

export const useGetOverlaySettings = (
  id: string
): UseQueryResult<TOverlaySettings> => {
  return useQuery({
    queryKey: ["settings", id],
    queryFn: async () => await getOverlaySettings(id),
  });
};

export const useUpdateOverlaySettings = (id: string) => {
  return useMutation({
    mutationKey: ["update-overlays-settings", id],
    mutationFn: async (payload: TUpdateOverlaySettings) =>
      updateOverlaySettings(payload, id),

  });
};
