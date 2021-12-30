import gql from 'graphql-tag';

export const GET_POST_SUBSCRIPTION = gql`
  subscription getPostSubscription {
    getPostSubscription {
      id
      content
      color
      createdDate
      user {
        id
        createdDate
        avatar
        login
      }
    }
  }
`;
