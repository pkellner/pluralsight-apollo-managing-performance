import React from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_SESSIONS_CONCAT } from '../graphql/queries';

const SpeakersLoadMore = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_SESSIONS_CONCAT,
    {
      variables: {
        afterCursor: '',
        limit: 4,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const loadingMoreData = networkStatus === NetworkStatus.fetchMore;

  if (loading && !loadingMoreData) {
    return <div className="col-sm6">Loading...</div>;
  }

  if (error === true) {
    return <div className="col-sm6">Error</div>;
  }

  const { datalist } = data.sessionsConcat;
  const { hasNextPage, lastCursor } = data.sessionsConcat.pageInfo;

  return (
    <div className="container show-fav mt-3">
      {datalist.map(({ id, eventYear, title }) => {
        return (
          <div key={id} className="col-sm-12">
            {eventYear} {title} ({id})
          </div>
        );
      })}

      {hasNextPage && (
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            fetchMore({
              variables: {
                afterCursor: lastCursor,
              },
            });
          }}
        >
          {loadingMoreData ? 'Loading...' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default SpeakersLoadMore;
