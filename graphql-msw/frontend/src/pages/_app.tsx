import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

const endpoint = process.env.NEXT_PUBLIC_API_URL ?? '';

const link = createHttpLink({
  uri: endpoint,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
