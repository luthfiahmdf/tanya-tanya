import { api } from "@/lib/axios";
import { TOverlaySettings, TUpdateOverlaySettings } from "./type";

export const getOverlaySettings = async (id: string) => {
  const { data } = await api.get<TOverlaySettings>(`settings/${id}`);
  return data;
};

export const updateOverlaySettings = async (
  payload: TUpdateOverlaySettings,
  id: string
) => {
  const { data } = await api.put<TUpdateOverlaySettings>(
    `settings/${id}`,
    payload
  );
  return data;
};
