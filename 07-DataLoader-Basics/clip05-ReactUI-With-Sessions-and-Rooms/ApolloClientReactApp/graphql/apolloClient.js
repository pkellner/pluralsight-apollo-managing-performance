import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { generalConcatPagination } from './pagination';

export const currentThemeVar = makeVar('light');
export const checkBoxListVar = makeVar([]);
export const paginationDataVar = makeVar({
  limit: 100,
  offset: 0,
  currentPage: 0,
  totalItemCount: 0,
});

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
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(options),
  });
}
