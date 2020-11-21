import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SPEAKERS } from '../graphql/queries';
import SpeakerCard from './SpeakerCard';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_SPEAKERS);

  if (loading) return <div className="">Loading...</div>;
  if (error === true) return <div className="col-sm6">Error</div>;

  return (
    <section className="speakers">
      <div className="container">
        <div className="row">
          <div className="speakers-list">
            {data.speakers.datalist.map((speakerRec) => {
              return (
                <SpeakerCard
                  speakerRec={speakerRec}
                  key={speakerRec.id}
                ></SpeakerCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
