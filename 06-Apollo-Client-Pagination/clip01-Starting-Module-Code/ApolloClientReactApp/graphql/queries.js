import { gql } from '@apollo/client';

export const GET_SPEAKERS = gql`
  query {
    speakers {
      datalist {
        id
        first
        last
        favorite
        fullName @client
        checkBoxColumn @client
      }
    }
  }
`;
