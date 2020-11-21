import { GET_SPEAKERS } from '../graphql/queries';
import { DELETE_SPEAKER, TOGGLE_SPEAKER_FAVORITE } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const SpeakerItem = ({ speakerRec }) => {
  const { id, first, last, favorite } = speakerRec;

  const [toggleSpeakerFavorite] = useMutation(TOGGLE_SPEAKER_FAVORITE);
  const [deleteSpeaker] = useMutation(DELETE_SPEAKER);

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
                favorite === true ? 'fa fa-star orange' : 'fa fa-star-o orange'
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
};

export default SpeakerItem;
