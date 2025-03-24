'use client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from 'react-toastify';
import theme from "../theme";

const queryClient = new QueryClient();

const Provider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        {children}
        <ToastContainer />
      </MantineProvider>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};
export default Provider;