import { gql } from '@apollo/client';
import { IPosts } from '../../types/IPosts.types';

export const GET_POST_BY_ID = gql`
  query getPostById($postId: ID!) {
    getPostById(postId: $postId) {
      id
      content
      color
      createdDate
      user {
        id
        avatar
        login
        createdDate
        updatedDate
        online
      }
    }
  }
`;
export type IGET_POST_BY_ID = {
  getPostById: IPosts;
};
