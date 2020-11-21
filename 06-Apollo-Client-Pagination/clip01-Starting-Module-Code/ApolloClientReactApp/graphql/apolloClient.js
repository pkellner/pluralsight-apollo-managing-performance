import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const currentThemeVar = makeVar('light');
export const checkBoxListVar = makeVar([]);

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
