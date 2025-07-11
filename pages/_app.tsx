import '@mantine/core/styles.css';
import '../src/index.css';
import type { AppProps } from 'next/app';
import { MantineProvider, createTheme } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
  },
});

const theme = createTheme({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          toastOptions={{ duration: 4000, style: { background: '#363636', color: '#fff' } }}
        />
      </QueryClientProvider>
    </MantineProvider>
  );
}
