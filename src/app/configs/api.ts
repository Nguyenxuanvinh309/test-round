// src/api/axiosInstance.ts
import { toast } from "react-toastify";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "@/utils/config";

const axiosInstance = axios.create({
  baseURL: API_URL, // Change this to your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handling interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(message);
    return Promise.reject(new Error(message));
  }
);

const handleRequest = async <TResponse>(
  request: Promise<AxiosResponse<TResponse>>
): Promise<TResponse> => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    toast.error((error as Error).message || "API request failed");
    throw new Error((error as Error).message || "API request failed");
  }
};

// CRUD Operations
const useGetData = <TResponse>(url: string, config?: AxiosRequestConfig) =>
  handleRequest<TResponse>(axiosInstance.get(url, config));

const usePostData = <TRequest, TResponse>(url: string, payload: TRequest, config?: AxiosRequestConfig) =>
  handleRequest<TResponse>(axiosInstance.post(url, payload, config));

const useDeleteData = <TResponse>(url: string, config?: AxiosRequestConfig) => 
  handleRequest<TResponse>(axiosInstance.delete(url, config));

const usePatchData = <TRequest, TResponse>(url: string, payload: TRequest, config?: AxiosRequestConfig) =>
  handleRequest<TResponse>(axiosInstance.patch(url, payload, config));

const useApi = async <TRequest, TResponse>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  payload?: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  const requestMap = {
    GET: () => axiosInstance.get<TResponse>(url, config),
    POST: () => axiosInstance.post<TResponse>(url, payload, config),
    PATCH: () => axiosInstance.patch<TResponse>(url, payload, config),
    DELETE: () => axiosInstance.delete<TResponse>(url, config),
  };

  if (!(method in requestMap)) {
    throw new Error("Invalid HTTP method");
  }

  return handleRequest<TResponse>(requestMap[method]());
};

export { useGetData, usePostData, useDeleteData, usePatchData, useApi };
