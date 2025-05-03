import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getDataDashboard,
  getQuestion,
  TUpdateQuestion,
  updateActiveQuestion,
  userMe,
} from "./api";
import { TDataDashboardResponse, TQuestionResponse, TUserMeResponse } from "./type";

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
export const useUpdateActiveQuestion = (id: string) => {
  return useMutation({
    mutationKey: ["update-active-question", id],
    mutationFn: async (payload: TUpdateQuestion) =>
      updateActiveQuestion(payload, id),
  });
};
export const useGetDashboardData = (
  id: string
): UseQueryResult<TDataDashboardResponse> => {
  return useQuery(({
    queryKey: ["data-dashboard"],
    queryFn: async () => await getDataDashboard(id)
  }))
}
