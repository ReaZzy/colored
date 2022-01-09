import { GetServerSideProps } from 'next';
import { AppDispatch, AppStore, initializeStore } from '../store/store';
import { initializeApollo } from '../apollo/client';
import { setIsAuth, setUser } from '../store/reducers/auth/reducer';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GET_PROFILE } from '../apollo/queries/getProfile';

type IGssp = (
  ctx: any,
  client: ApolloClient<NormalizedCacheObject>,
  store?: AppStore,
  dispatch?: AppDispatch,
) => Promise<any>;

export const createGssp =
  (gssp: IGssp): GetServerSideProps =>
  async (ctx: any): Promise<any> => {
    const store = initializeStore();
    const client = initializeApollo({ headers: ctx?.req?.headers });
    const { data } = await client.query({ query: GET_PROFILE });
    const { dispatch } = store;
    dispatch(setUser(data.getProfile));
    dispatch(setIsAuth(true));
    return await gssp(ctx, store, client, dispatch);
  };
