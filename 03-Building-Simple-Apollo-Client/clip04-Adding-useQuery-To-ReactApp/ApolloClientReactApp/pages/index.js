import { gql, useQuery } from '@apollo/client';

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
const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_SPEAKERS);

  if (loading === true) return <div className="col-sm6">Loading...</div>;

  if (error === true) return <div className="col-sm6">Error</div>;

  return (
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
                  <span>
                    <div
                      className={
                        favorite === true
                          ? 'fa fa-star orange'
                          : 'fa fa-star-o orange'
                      }
                    />
                    &nbsp;&nbsp; Favorite
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
