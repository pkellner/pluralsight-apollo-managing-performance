import { gql } from '@apollo/client';

export const GET_SESSIONS_CONCAT = gql`
  query($afterCursor: String, $limit: Int) {
    sessionsConcat(afterCursor: $afterCursor, limit: $limit) {
      datalist {
        id
        title
        eventYear
        cursor
      }
      pageInfo {
        totalItemCount
        lastCursor
        hasNextPage
      }
    }
  }
`;

export const GET_SPEAKERS_CONCAT = gql`
  query($afterCursor: String, $limit: Int) {
    speakersConcat(afterCursor: $afterCursor, limit: $limit) {
      datalist {
        id
        first
        last
        favorite
        cursor
        fullName @client
        checkBoxColumn @client
      }
      pageInfo {
        totalItemCount
        lastCursor
        hasNextPage
      }
    }
  }
`;

export const GET_SPEAKERS = gql`
  query($offset: Int, $limit: Int) {
    speakers(offset: $offset, limit: $limit) {
      datalist {
        id
        first
        last
        favorite
        company
        twitterHandle
        bio
        fullName @client
        checkBoxColumn @client
        sessions {
          id
          title
          eventYear
          room {
            name
          }
        }
      }
      pageInfo {
        totalItemCount
      }
    }
  }
`;
