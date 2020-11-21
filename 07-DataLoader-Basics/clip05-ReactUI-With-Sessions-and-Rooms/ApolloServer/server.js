const { gql, ApolloServer, UserInputError } = require("apollo-server");
const axios = require("axios");
const DataLoader = require("dataloader");

const typeDefs = gql`
  type Room {
    id: ID!
    name: String
    capacity: Int
  }

  type Speaker {
    id: ID!
    first: String
    last: String
    favorite: Boolean
    cursor: String
    company: String
    twitterHandle: String
    bio: String
    sessions: [Session]
  }

  input SpeakerInput {
    first: String
    last: String
    favorite: Boolean
  }

  type PageInfo {
    totalItemCount: Int
    lastCursor: String
    hasNextPage: Boolean
  }

  type SpeakerResults {
    datalist: [Speaker]
    pageInfo: PageInfo
  }

  type Session {
    id: ID!
    title: String!
    eventYear: String
    cursor: String
    room: Room
  }

  type SessionResults {
    datalist: [Session]
    pageInfo: PageInfo
  }

  type Query {
    speakers(offset: Int = 0, limit: Int = -1): SpeakerResults
    speakersConcat(limit: Int = -1, afterCursor: String = ""): SpeakerResults
    sessionsConcat(limit: Int = -1, afterCursor: String = ""): SessionResults
  }

  type Mutation {
    toggleSpeakerFavorite(speakerId: Int!): Speaker
    addSpeaker(speaker: SpeakerInput): Speaker
    deleteSpeaker(speakerId: Int!): Speaker
  }
`;

const getCursor = (rec) => Buffer.from(rec.toString()).toString("base64");

const getOffsetCustom = (data, afterCursor) => {
  const offsetBasedOnFind = data.findIndex(
    (rec) => getCursor(rec.id) === afterCursor
  );
  return offsetBasedOnFind === -1 ? 0 : offsetBasedOnFind + 1;
};

const resolvers = {
  Query: {
    async speakers(parent, args, context, info) {
      const response = await axios.get("http://localhost:5000/speakers");
      const { offset, limit } = args;
      return {
        datalist: response.data.filter((rec, index) => {
          return index > offset - 1 && (offset + limit > index || limit == -1);
        }),
        pageInfo: {
          totalItemCount: response.data.length,
        },
      };
    },
    async speakersConcat(parent, args, context, info) {
      const response = await axios.get("http://localhost:5000/speakers");
      const data = response.data.sort((a, b) => {
        return a.last.localeCompare(b);
      });
      const { limit, afterCursor } = args;
      const offset = getOffsetCustom(data, afterCursor);
      const datalist = data
        .filter((rec, index) => {
          return index > offset - 1 && (offset + limit > index || limit == -1);
        })
        .map((rec) => {
          rec.cursor = getCursor(rec.id);
          return rec;
        });
      const pageInfo = {
        totalItemCount: data.length,
        lastCursor:
          datalist.length > 0
            ? getCursor(datalist[datalist.length - 1].id)
            : "",
        hasNextPage: offset + datalist.length < data.length,
      };

      return {
        datalist,
        pageInfo,
      };
    },
    async sessionsConcat(parent, args, context, info) {
      const response = await axios.get("http://localhost:5000/sessions");
      const data = response.data.sort((a, b) => {
        return a.eventYear.localeCompare(b);
      });
      const { limit, afterCursor } = args;
      const offset = getOffsetCustom(data, afterCursor);
      const datalist = data
        .filter((rec, index) => {
          return index > offset - 1 && (offset + limit > index || limit == -1);
        })
        .map((rec) => {
          rec.cursor = getCursor(rec.id);
          return rec;
        });
      const pageInfo = {
        totalItemCount: data.length,
        lastCursor:
          datalist.length > 0
            ? getCursor(datalist[datalist.length - 1].id)
            : "",
        hasNextPage: offset + datalist.length < data.length,
      };

      return {
        datalist,
        pageInfo,
      };
    },
  },

  Session: {
    async room(parent, args, { roomLoader }, info) {
      const roomId = parent.roomId;
      return roomLoader.load(roomId);

      // const responseRooms = await axios.get("http://localhost:5000/Rooms");
      // const roomRec = responseRooms.data.find((room) => {
      //   return roomId === room.id;
      // });
      // return roomRec;
    },
  },

  Speaker: {
    async sessions(parent, args, { sessionsLoader }, info) {
      const speakerId = parent.id;
      return sessionsLoader.load(speakerId);
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
    context: () => {
      return {
        roomLoader: new DataLoader(async (roomIds) => {
          const responseRooms = await axios.get("http://localhost:5000/rooms");

          const roomMap = {};
          responseRooms.data.forEach((room) => {
            roomMap[room.id] = room;
          });

          return roomIds.map((roomId) => {
            return roomMap[roomId];
          });
        }),
        sessionsLoader: new DataLoader(async (speakerIds) => {
          const responseSessions = await axios.get(
            "http://localhost:5000/sessions"
          );
          const responseSessionSpeakers = await axios.get(
            "http://localhost:5000/sessionSpeakers"
          );

          const sessionIds = responseSessionSpeakers.data
            .filter((rec) => {
              return speakerIds.includes(rec.speakerId);
            })
            .map((rec) => {
              return rec.sessionId;
            });

          const sessionsResult = responseSessions.data.filter((rec) => {
            return sessionIds.includes(rec.id);
          });

          let sessionsForSpeakerMap = {};
          speakerIds.forEach((speakerId) => {
            const sessionIdsForSpeaker = responseSessionSpeakers.data
              .filter((sessionSpeakerRec) => {
                return sessionSpeakerRec.speakerId === speakerId;
              })
              .map((sessionSpeakerRec) => {
                return sessionSpeakerRec.sessionId;
              });

            const sessionsForSpeaker = sessionsResult.filter((session) => {
              return sessionIdsForSpeaker.includes(session.id);
            });

            sessionsForSpeakerMap[speakerId] = sessionsForSpeaker;
          });

          return speakerIds.map((speakerId) => {
            return sessionsForSpeakerMap[speakerId];
          });
        }),
      };
    },
  });

  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () => {
    console.log(`ApolloServer GraphQL Simple running at port ${PORT}`);
  });
}

apolloServer();
