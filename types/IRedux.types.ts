import * as PostActions from '../store/reducers/post/actions';
import * as AuthActions from '../store/reducers/auth/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type PostActionTypes = ReturnType<InferValueTypes<typeof PostActions>>;
export type AuthActionTypes = ReturnType<InferValueTypes<typeof AuthActions>>;
