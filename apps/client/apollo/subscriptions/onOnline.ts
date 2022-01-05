import { gql } from '@apollo/client';

export const ON_ONLINE = gql`
  subscription onOnline($id: ID!) {
    onOnline(id: $id)
  }
`;
