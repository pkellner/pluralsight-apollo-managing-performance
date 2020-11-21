import { ApolloClient, InMemoryCache } from '@apollo/client';

export function useApollo() {
  return new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });
}
