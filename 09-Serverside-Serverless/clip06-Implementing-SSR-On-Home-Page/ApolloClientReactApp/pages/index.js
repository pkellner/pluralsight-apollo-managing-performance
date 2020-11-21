import React from 'react';
import SpeakerListItems from '../components/SpeakerListItems';
import { initializeApollo } from '../graphql/apolloClient';
import { GET_SPEAKERS } from '../graphql/queries';

const IndexPage = () => {
  return <SpeakerListItems />;
};

export async function getServerSideProps({ query }) {
  const currentPage = query && query.page ? query.page : 1;
  const apolloClient = initializeApollo(undefined, { currentPage });

  await apolloClient.query({
    query: GET_SPEAKERS,
    variables: {
      offset: (currentPage - 1) * 4,
      limit: 4,
    },
  });
  await apolloClient.query({
    query: GET_SPEAKERS,
    variables: {
      offset: currentPage * 4,
      limit: 4,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      currentPage,
    },
  };
}

export default IndexPage;
