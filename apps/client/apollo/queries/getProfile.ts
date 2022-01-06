import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query getProfile($id: ID) {
    getProfile(id: $id) {
      login
      avatar
      email
      id
      createdDate
      updatedDate
      online
    }
  }
`;
