import { api } from "@/lib/axios";

type TLogin = {
  username: string;
  password: string;
};
export const loginRequest = async (payload: TLogin) => {
  const { data } = await api.post(`/login`, payload);
  return data;
};
