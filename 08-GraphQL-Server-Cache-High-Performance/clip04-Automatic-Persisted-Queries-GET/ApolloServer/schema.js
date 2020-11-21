const { gql } = require("apollo-server");

module.exports = gql`
  type Room {
    id: ID!
    name: String
    capacity: Int
  }

  type Speaker @cacheControl(maxAge: 3600) {
    id: ID!
    first: String
    last: String
    favorite: Boolean @cacheControl(maxAge: 5,scope: PRIVATE)
    cursor: String
    company: String
    twitterHandle: String
    bio: String
    sessions: [Session] @cacheControl(maxAge: 600)
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