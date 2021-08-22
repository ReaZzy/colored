export const setToken = (payload: string | null) =>
  ({
    type: 'auth/SET_TOKEN',
    payload,
  } as const);

export const setIsAuth = (payload: boolean) =>
  ({
    type: 'auth/SET_ISAUTH',
    payload,
  } as const);
