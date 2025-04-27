import { useMutation } from "@tanstack/react-query";
import { registerRequest, TRegister } from "./api";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["create-question"],
    mutationFn: async (payload: TRegister) => registerRequest(payload),
  });
};
