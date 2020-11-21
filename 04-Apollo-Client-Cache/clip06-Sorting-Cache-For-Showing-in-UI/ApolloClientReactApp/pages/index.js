import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import Toolbar from '../components/Toolbar';

const GET_SPEAKERS = gql`
  query {
    speakers {
      datalist {
        id
        first
        last
        favorite
      }
    }
  }
`;

const ADD_SPEAKERS = gql`
  mutation AddSpeaker($first: String, $last: String, $favorite: Boolean) {
    addSpeaker(speaker: { first: $first, last: $last, favorite: $favorite }) {
      id
      first
      last
      favorite
    }
  }
`;

const TOGGLE_SPEAKER_FAVORITE = gql`
  mutation ToggleSpeakerFavorite($speakerId: Int!) {
    toggleSpeakerFavorite(speakerId: $speakerId) {
      id
      first
      last
      favorite
    }
  }
`;

const DELETE_SPEAKER = gql`
  mutation DeleteSpeaker($speakerId: Int!) {
    deleteSpeaker(speakerId: $speakerId) {
      id
      first
      last
      favorite
    }
  }
`;

const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_SPEAKERS);
  const [toggleSpeakerFavorite] = useMutation(TOGGLE_SPEAKER_FAVORITE);
  const [deleteSpeaker] = useMutation(DELETE_SPEAKER);
  const [addSpeaker] = useMutation(ADD_SPEAKERS);
  const apolloClient = useApolloClient();
  if (loading === true) return <div className="col-sm6">Loading...</div>;

  if (error === true) return <div className="col-sm6">Error</div>;

  return (
    <>
      <Toolbar
        sortByIdDescending={() => {
          const { speakers } = apolloClient.cache.readQuery({
            query: GET_SPEAKERS,
          });
          apolloClient.cache.writeQuery({
            query: GET_SPEAKERS,
            data: {
              speakers: {
                __typename: 'SpeakerResults',
                datalist: [...speakers.datalist].sort((a, b) => b.id - a.id),
              },
            },
          });
        }}
        insertSpeakerEvent={(first, last, favorite) => {
          addSpeaker({
            variables: {
              first,
              last,
              favorite,
            },
            //refetchQueries: [{query: GET_SPEAKERS}],
            update: (cache, { data: { addSpeaker } }) => {
              const { speakers } = cache.readQuery({
                query: GET_SPEAKERS,
              });
              cache.writeQuery({
                query: GET_SPEAKERS,
                data: {
                  speakers: {
                    __typename: 'SpeakerResults',
                    datalist: [addSpeaker, ...speakers.datalist],
                  },
                },
              });
            },
          });
        }}
      />
      <div className="container show-fav">
        <div className="row">
          <div className="fav-list">
            {data.speakers.datalist.map(({ id, first, last, favorite }) => {
              return (
                <div className="favbox" key={id}>
                  <div className="fav-clm col-sm-7">
                    <h4>
                      {first} {last} ({id})
                    </h4>
                  </div>
                  <div className="fav-clm col-sm-5">
                    <div className="action">
                      <span
                        onClick={() => {
                          toggleSpeakerFavorite({
                            variables: {
                              speakerId: parseInt(id),
                            },
                            optimisticResponse: {
                              __typename: 'Mutation',
                              toggleSpeakerFavorite: {
                                id,
                                first,
                                last,
                                favorite: !favorite,
                                __typename: 'Speaker',
                              },
                            },
                          });
                        }}
                      >
                        <div
                          className={
                            favorite === true
                              ? 'fa fa-star orange'
                              : 'fa fa-star-o orange'
                          }
                        />
                        &nbsp;&nbsp; Favorite
                      </span>
                      <span
                        onClick={() => {
                          deleteSpeaker({
                            variables: {
                              speakerId: parseInt(id),
                            },
                            optimisticResponse: {
                              typename: '__mutation',
                              deleteSpeaker: {
                                id,
                                first,
                                last,
                                favorite,
                                __typename: 'Speaker',
                              },
                            },
                            //refetchQueries: [{ query: GET_SPEAKERS }],
                            update: (cache, { data: { deleteSpeaker } }) => {
                              const { speakers } = cache.readQuery({
                                query: GET_SPEAKERS,
                              });
                              cache.writeQuery({
                                query: GET_SPEAKERS,
                                data: {
                                  speakers: {
                                    __typename: 'SpeakerResults',
                                    datalist: speakers.datalist.filter(
                                      (rec) => rec.id != deleteSpeaker.id,
                                    ),
                                  },
                                },
                              });
                            },
                          });
                        }}
                      >
                        <i className="fa fa-trash red" /> Delete
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
