import { api } from "@/lib/axios";
import { TCreateQuestion } from "./type";

export const createQuestion = async (
  payload: TCreateQuestion,
  username: string
) => {
  const { data } = await api.post<TCreateQuestion>(
    `/questions/${username}`,
    payload
  );
  return data;
};
