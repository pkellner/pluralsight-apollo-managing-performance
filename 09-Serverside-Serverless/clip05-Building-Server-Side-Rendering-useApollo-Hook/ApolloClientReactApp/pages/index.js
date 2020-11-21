import React from 'react';
import SpeakerListItems from '../components/SpeakerListItems';
import { initializeApollo } from '../graphql/apolloClient';
import { GET_SPEAKERS } from '../graphql/queries';

const IndexPage = () => {
  return <SpeakerListItems />;
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  const currentPage = 1;

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
    },
  };
}

export default IndexPage;
