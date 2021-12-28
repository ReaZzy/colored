import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($content: String!, $color: String!) {
    createPost(post: { content: $content, color: $color }) {
      id
      color
      createdDate
      user {
        id
        login
        avatar
      }
    }
  }
`;
