import { api } from "@/lib/axios";
import { TQuestionResponse, TUserMeResponse } from "./type";
import { TActiveOverlay } from "../overlay/type";

export type TUpdateQuestion = {
  questionId: string;
};
export const userMe = async () => {
  const { data } = await api.get<TUserMeResponse>("users/me");
  return data;
};
export const getQuestion = async (username: string) => {
  const { data } = await api.get<TQuestionResponse[]>(`questions/${username}`);
  return data;
};
export const updateActiveQuestion = async (
  payload: TUpdateQuestion,
  id: string
) => {
  const { data } = await api.put<TActiveOverlay>(
    `activeQuestions/${id}`,
    payload
  );
  return data;
};
