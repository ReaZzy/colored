import gql from 'graphql-tag';
import { IPosts } from '../../types/IPosts.types';

export const GET_ALL_POSTS = gql`
  query getAllPosts($page: Float!) {
    getAllPosts(page: $page) {
      posts {
        id
        content
        color
        createdDate
        user {
          id
          login
        }
      }
      total
    }
  }
`;

export type IGET_ALL_POSTS = {
  getAllPosts: {
    posts: IPosts;
    total: number;
  };
};
