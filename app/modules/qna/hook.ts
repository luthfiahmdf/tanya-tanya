import { useMutation } from "@tanstack/react-query";
import { TCreateQuestion } from "./type";
import { createQuestion } from "./api";

export const useCreateQuestion = (username: string) => {
  return useMutation({
    mutationKey: ["create-question"],
    mutationFn: async (payload: TCreateQuestion) =>
      createQuestion(payload, username),
  });
};
