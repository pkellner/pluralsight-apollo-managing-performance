const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema.js");
const { getSessionsLoader, getRoomLoader } = require("./dataloaders");
const { Query, Mutation, Session, Speaker } = require("./resolvers");

const resolvers = {
  Query,
  Session,
  Speaker,
  Mutation,
};

async function apolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {
        roomLoader: getRoomLoader(),
        sessionsLoader: getSessionsLoader(),
      };
    },
  });

  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () => {
    console.log(`ApolloServer GraphQL Simple running at port ${PORT}`);
  });
}

apolloServer();
