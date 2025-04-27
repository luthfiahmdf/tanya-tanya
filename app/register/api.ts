import { api } from "@/lib/axios";

export type TRegister = {
  username: string;
  password: string;
};
export const registerRequest = async (payload: TRegister) => {
  const { data } = await api.post(`/users`, payload);
  return data;
};
