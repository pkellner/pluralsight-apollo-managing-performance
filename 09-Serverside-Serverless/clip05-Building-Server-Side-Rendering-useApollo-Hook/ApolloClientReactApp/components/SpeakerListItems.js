import { useQuery, useReactiveVar } from '@apollo/client';
import Toolbar from '../components/Toolbar';
import { GET_SPEAKERS } from '../graphql/queries';
import React from 'react';
import SpeakerItem from './SpeakerItem';
import { currentThemeVar, paginationDataVar } from '../graphql/apolloClient';

const IndexPage = () => {
  const paginationData = useReactiveVar(paginationDataVar);
  const { limit, currentPage } = paginationData;

  const { loading, error, data } = useQuery(GET_SPEAKERS, {
    variables: {
      offset: currentPage * limit,
      limit,
    },
  });
  const currentTheme = useReactiveVar(currentThemeVar);

  if (loading) return <div className="">Loading...</div>;

  if (error === true) return <div className="col-sm6">Error</div>;

  return (
    <>
      <Toolbar totalItemCount={data.speakers.pageInfo.totalItemCount} />
      <div className="container show-fav">
        <div className="row">
          <div
            className={currentTheme === 'dark' ? 'fav-list dark' : 'fav-list'}
          >
            {data.speakers.datalist.map(
              ({ id, first, last, favorite, fullName, checkBoxColumn }) => {
                return (
                  <SpeakerItem
                    key={id}
                    speakerRec={{
                      id,
                      first,
                      last,
                      favorite,
                      fullName,
                      checkBoxColumn,
                    }}
                  ></SpeakerItem>
                );
              },
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
