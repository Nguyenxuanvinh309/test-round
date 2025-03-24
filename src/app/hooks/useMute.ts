import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useApi } from "../configs/api";
import { HttpMethod } from "../configs/types";

type Callbacks<TResponse> = {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: TResponse, error?: Error | null) => void;
};

type Props<TRequest> = {
  url: string;
  payload?: TRequest;
  method?: HttpMethod;
};

const useMute = <TRequest, TResponse>(
  options?: UseMutationOptions<TResponse, Error, Props<TRequest>>
) => {
  const mutation = useMutation<TResponse, Error, Props<TRequest>>({
    mutationFn: ({ url, payload, method = "POST" }) =>
      useApi<TRequest, TResponse>(url, method, payload),
    ...options,
  });
  return {
    request: (
      { url, method = "POST" }: { url: string; method?: HttpMethod },
      payload?: TRequest,
      { onSuccess, onError, onSettled }: Callbacks<TResponse> = {}
    ) => {
      mutation.mutate(
        { url, payload, method },
        { onSuccess, onError, onSettled }
      );
    },

    requestAsync: async (
      { url, method = "POST" }: { url: string; method?: HttpMethod },
      payload?: TRequest,
      { onSuccess, onError, onSettled }: Callbacks<TResponse> = {}
    ) => {
      try {
        return await mutation.mutateAsync(
          { url, payload, method },
          { onSuccess, onError, onSettled }
        );
      } catch (error) {
        throw error;
      }
    },
  
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useMute;
