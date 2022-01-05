import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query getProfile {
    getProfile {
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
