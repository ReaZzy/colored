import * as PostActions from '../store/reducers/post/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type PostActionTypes = ReturnType<InferValueTypes<typeof PostActions>>;
