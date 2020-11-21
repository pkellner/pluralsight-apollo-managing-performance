const { gql, ApolloServer, UserInputError } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Speaker {
    id: ID!
    first: String
    last: String
    favorite: Boolean
  }

  input SpeakerInput {
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

  type Mutation {
    toggleSpeakerFavorite(speakerId: Int!): Speaker
    addSpeaker(speaker: SpeakerInput): Speaker
    deleteSpeaker(speakerId: Int!): Speaker
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
  Mutation: {
    async toggleSpeakerFavorite(parent, args, context, info) {
      const response = await axios.get(
        `http://localhost:5000/speakers/${args.speakerId}`
      );
      const toggledData = {
        ...response.data,
        favorite: !response.data.favorite,
      };
      await axios.put(
        `http://localhost:5000/speakers/${args.speakerId}`,
        toggledData
      );
      return toggledData;
    },
    async addSpeaker(parent, args, context, info) {
      const { first, last, favorite } = args.speaker;
      const response = await axios.get("http://localhost:5000/speakers");
      const foundRec = response.data.find(
        (a) => a.first === first && a.last === last
      );
      if (foundRec) {
        throw new UserInputError("first and last already exist", {
          invalidArgs: Object.keys(args),
        });
      }
      const resp = await axios.post("http://localhost:5000/speakers", {
        first,
        last,
        favorite,
      });
      return resp.data;
    },
    async deleteSpeaker(parent, args, context, info) {
      const url = `http://localhost:5000/speakers/${args.speakerId}`;
      const foundRec = await axios.get(url);
      await axios.delete(url);
      return foundRec.data;
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
