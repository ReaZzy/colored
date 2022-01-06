import { gql } from '@apollo/client';

export const GET_AVATAR = gql`
  query getAvatar($id: ID) {
    getProfile(id: $id) {
      id
      avatar
      online
    }
  }
`;
