import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { user } from '../store/reducers/auth/thunks';
import {
  initializeStore,
  AppStore,
  AppDispatch,
  store as _store,
} from '../store/store';
import { setJwtToken } from './setJwtToken';

type IGssp = (
  ctx: any,
  store?: AppStore,
  dispatch?: AppDispatch,
) => Promise<any>;

export const createGssp =
  (gssp: IGssp, needRedirect = true, checkAuth = true): GetServerSideProps =>
  async (ctx: any): Promise<any> => {
    const store = _store ?? initializeStore();
    const { dispatch } = store;
    if (checkAuth) {
      const cookies = new Cookies(ctx.req, ctx.res);
      const token = cookies.get('auth') || null;
      const valid = await dispatch(setJwtToken(token));

      valid && (await dispatch(await user()));
      if (!valid && needRedirect) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
    }
    return await gssp(ctx, store, dispatch);
  };
