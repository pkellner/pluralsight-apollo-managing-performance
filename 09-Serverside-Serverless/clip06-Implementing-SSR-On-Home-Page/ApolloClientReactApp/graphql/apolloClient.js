import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';
import merge from 'deepmerge';
import { generalConcatPagination } from './pagination';

export const currentThemeVar = makeVar('light');
export const checkBoxListVar = makeVar([]);
export const paginationDataVar = makeVar({
  limit: 4,
  offset: 0,
  currentPage: 0,
  totalItemCount: 0,
});

const link = ApolloLink.from([
  createPersistedQueryLink({ useGETForHashedQueries: true }),
  createHttpLink({ uri: 'http://localhost:4000/graphql' }),
]);

const options = {
  typePolicies: {
    Query: {
      fields: {
        speakersConcat: generalConcatPagination(),
        sessionsConcat: generalConcatPagination(),
      },
    },
    Speaker: {
      fields: {
        fullName: {
          read: function (_, { readField }) {
            return `${readField('first')} ${readField('last')}`;
          },
        },
        checkBoxColumn: {
          read: function (_, { readField }) {
            const id = readField('id');
            const selectedSpeakerIds = checkBoxListVar();
            return selectedSpeakerIds ? selectedSpeakerIds.includes(id) : false;
          },
        },
      },
    },
  },
};

let apolloClient;

export function initializeApollo(initialState = null, pageProps) {
  const isNodeServer = typeof window === 'undefined';

  paginationDataVar({
    ...paginationDataVar(),
    currentPage: parseInt(pageProps.currentPage -1),
  })

  const _apolloClient =
    apolloClient ??
    new ApolloClient({
      cache: new InMemoryCache(options),
      link,
      ssrMode: isNodeServer,
    });
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache);
    _apolloClient.cache.restore(data);
  }
  if (isNodeServer) return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState, pageProps) {
  return useMemo(() => {
    return initializeApollo(initialState, pageProps);
  }, [initialState]);
}
