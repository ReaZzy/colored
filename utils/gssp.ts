import { GetServerSideProps } from 'next';
import { initializeStore, AppStore, AppDispatch } from '../store/store';

type IGssp = (
  ctx: any,
  store?: AppStore,
  dispatch?: AppDispatch,
) => Promise<any>;

export const createGssp =
  (gssp: IGssp): GetServerSideProps =>
  async (ctx: any): Promise<any> => {
    const store = initializeStore();
    const { dispatch } = store;
    return await gssp(ctx, store, dispatch);
  };
