import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { generalConcatPagination } from './pagination';

import { ApolloLink } from 'apollo-link';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';

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

export function useApollo() {
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
              return selectedSpeakerIds
                ? selectedSpeakerIds.includes(id)
                : false;
            },
          },
        },
      },
    },
  };
  return new ApolloClient({
    cache: new InMemoryCache(options),
    link,
  });
}
