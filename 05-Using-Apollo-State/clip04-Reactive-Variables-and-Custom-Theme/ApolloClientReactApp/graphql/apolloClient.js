import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const currentThemeVar = makeVar('dark');

export function useApollo() {
  const options = {
    typePolicies: {
      Speaker: {
        fields: {
          fullName: {
            read: function (_, { readField }) {
              return `${readField('first')} ${readField('last')}`;
            },
          },
        },
      },
    },
  };

  return new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(options),
  });
}
