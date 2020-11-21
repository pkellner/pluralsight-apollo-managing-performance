import { useApollo } from '../graphql/apolloClient';
import { ApolloProvider } from '@apollo/client';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo();

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
