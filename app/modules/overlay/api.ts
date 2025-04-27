import { api } from "@/lib/axios";
import { TActiveOverlay } from "./type";

export const getOverlay = async (username: string) => {
  const { data } = await api.get<TActiveOverlay>(`activeQuestions/${username}`);
  return data;
};
