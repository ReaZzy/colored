import { GetServerSideProps } from 'next';
import { initializeStore, AppStore, AppDispatch } from '../store/store';
import { initializeApollo } from '../apollo/client';
import { setUser } from '../store/reducers/auth/reducer';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';

type IGssp = (
  ctx: any,
  store?: AppStore,
  client?: ApolloClient<NormalizedCacheObject>,
  dispatch?: AppDispatch,
) => Promise<any>;

export const createGssp =
  (gssp: IGssp): GetServerSideProps =>
  async (ctx: any): Promise<any> => {
    const getProfile = gql`
      query getProfile {
        getProfile {
          login
          avatar
          email
          id
          createdDate
        }
      }
    `;
    const store = initializeStore();
    const client = initializeApollo({ headers: ctx?.req?.headers });
    const { data } = await client.query({ query: getProfile });
    const { dispatch } = store;
    dispatch(setUser(data.getProfile));
    return await gssp(ctx, store, client, dispatch);
  };
