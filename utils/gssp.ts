import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { user } from '../store/reducers/auth/thunks';
import { initializeStore } from '../store/store';
import { setJwtToken } from './setJwtToken';

export const createGssp: any =
  //@ts-ignore

    ({ checkAuth = true, handleShit }): GetServerSideProps =>
    async (ctx) => {
      let props = {};

      if (checkAuth) {
        const store = initializeStore();
        const { dispatch } = store;
        const cookies = new Cookies(ctx.req, ctx.res);
        const token = cookies.get('auth') || null;
        const valid = await dispatch(setJwtToken(token));
        valid && (await dispatch(await user()));
      }
      if (handleShit) {
        props = { ...props, ...handleShit(ctx) };
      }
      return {
        props,
      };
    };
