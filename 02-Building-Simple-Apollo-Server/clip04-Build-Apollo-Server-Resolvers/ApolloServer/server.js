const { gql, ApolloServer } = require("apollo-server");

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
    speakers: (parent, args, context, info) => {
      const speakerResults = {
        datalist: [
          { id: 101, first: "David", last: "Jones" },
          { id: 102, first: "Tom", last: "Lewis" },
          { id: 103, first: "Doug", last: "Thompson" },
        ],
      };
      return speakerResults;
    },
  },

  SpeakerResults: {
    datalist: (parent, args, context, info) => {
      return parent.datalist;
    },
  },

  Speaker: {
    id: (parent, args, context, info) => {
      return parent.id;
    },
    first: (parent, args, context, info) => {
      return parent.first;
    },
    last: (parent, args, context, info) => {
      return parent.last;
    },
    favorite: (parent, args, context, info) => {
      return parent.favorite;
    },
  },
};
