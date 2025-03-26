/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useGetData } from "../configs/api"; // ✅ Ensure this is a FUNCTION, not a hook

type Props<T> = {
  url: string;
  queryKey: string[];
} & Omit<UseQueryOptions<T, unknown>, "queryKey" | "queryFn">;

const useFetch = <T>({ url, queryKey, ...options }: Props<T>) => {
  return useQuery<T, unknown>({
    queryKey: [...queryKey], 
    queryFn: async () => await useGetData<T>(url), // ✅ Pass `url` to useGetData
    ...options, 
  });
};

export default useFetch;
