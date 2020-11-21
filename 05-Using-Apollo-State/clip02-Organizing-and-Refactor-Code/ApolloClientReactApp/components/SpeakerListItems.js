import { useQuery } from '@apollo/client';
import Toolbar from '../components/Toolbar';
import { GET_SPEAKERS } from '../graphql/queries';
import React from 'react';
import SpeakerItem from './SpeakerItem';

const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_SPEAKERS);

  if (loading) return <div className="">Loading...</div>;

  if (error === true) return <div className="col-sm6">Error</div>;

  return (
    <>
      <Toolbar />
      <div className="container show-fav">
        <div className="row">
          <div className="fav-list">
            {data.speakers.datalist.map(({ id, first, last, favorite }) => {
              return (
                <SpeakerItem
                  key={id}
                  speakerRec={{ id, first, last, favorite }}
                ></SpeakerItem>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
