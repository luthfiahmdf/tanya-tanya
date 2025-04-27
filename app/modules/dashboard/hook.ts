import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getQuestion,
  TUpdateQuestion,
  updateActiveQuestion,
  userMe,
} from "./api";
import { TQuestionResponse, TUserMeResponse } from "./type";

export const useGetUserMe = (): UseQueryResult<TUserMeResponse> => {
  return useQuery({
    queryKey: ["user-me"],
    queryFn: async () => await userMe(),
  });
};
export const useGetQuestion = (
  username: string
): UseQueryResult<TQuestionResponse[]> => {
  return useQuery({
    queryKey: ["question", username],
    queryFn: async () => await getQuestion(username),
  });
};
export const useUpdateActiveQuestion = (username: string) => {
  return useMutation({
    mutationKey: ["update-active-question", username],
    mutationFn: async (payload: TUpdateQuestion) =>
      updateActiveQuestion(payload, username),
  });
};
