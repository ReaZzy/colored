import gql from 'graphql-tag';

export const GET_ALL_POSTS = gql`
  query getAllPosts($page: Float!) {
    getAllPosts(page: $page) {
      posts {
        id
        content
        color
        createdDate
        user {
          avatar
          login
          createdDate
        }
      }
      total
    }
  }
`;
