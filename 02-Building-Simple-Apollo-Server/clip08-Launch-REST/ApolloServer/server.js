const { gql, ApolloServer } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Speaker {
    id: ID!
    first: String
    last: String
    favorite: Boolean
  }

  type SpeakerResults {
    datalist: [Speaker]
  }

  type Query {
    speakers: SpeakerResults
  }
`;

const resolvers = {
  Query: {
    async speakers(parent, args, context, info) {
      const response = await axios.get("http://localhost:5000/speakers");
      return {
        datalist: response.data,
      };
    },
  },
};

async function apolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () => {
    console.log(`ApolloServer GraphQL Simple running at port ${PORT}`);
  });
}

apolloServer();
