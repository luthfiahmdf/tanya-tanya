import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const configApi: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
};
export const api = axios.create(configApi);

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    //  console.log("[Interceptor] Session:", session);

    const token = session?.user?.accessToken;

    if (token) {
      //      console.log("[Interceptor] Attach token:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("[Interceptor] No token found");
    }

    return config;
  },
  (error) => Promise.reject(error)
);
