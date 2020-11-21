import { gql } from '@apollo/client';

export const ADD_SPEAKERS = gql`
  mutation AddSpeaker($first: String, $last: String, $favorite: Boolean) {
    addSpeaker(speaker: { first: $first, last: $last, favorite: $favorite }) {
      id
      first
      last
      favorite
    }
  }
`;

export const TOGGLE_SPEAKER_FAVORITE = gql`
  mutation ToggleSpeakerFavorite($speakerId: Int!) {
    toggleSpeakerFavorite(speakerId: $speakerId) {
      id
      first
      last
      favorite
    }
  }
`;

export const DELETE_SPEAKER = gql`
  mutation DeleteSpeaker($speakerId: Int!) {
    deleteSpeaker(speakerId: $speakerId) {
      id
      first
      last
      favorite
    }
  }
`;
