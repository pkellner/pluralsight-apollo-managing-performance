import { gql } from '@apollo/client';

export const GET_SPEAKERS = gql`
  query($offset: Int, $limit: Int) {
    speakers(offset: $offset, limit: $limit) {
      datalist {
        id
        first
        last
        favorite
        fullName @client
        checkBoxColumn @client
      }
      pageInfo {
        totalItemCount
      }
    }
  }
`;
