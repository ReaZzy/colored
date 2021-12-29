import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation register($login: String!, $email: String!, $password: String!) {
    register(userData: { login: $login, email: $email, password: $password }) {
      access_token
      user {
        id
        login
        avatar
      }
    }
  }
`;
