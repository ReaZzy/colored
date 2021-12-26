import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import merge from 'deepmerge';
import { IncomingHttpHeaders } from 'http';
import fetch from 'isomorphic-unfetch';
import isEqual from 'lodash/isEqual';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/link-error';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const ssrMode = typeof window === 'undefined';
const wsLink: any = process.browser
  ? new WebSocketLink({
      uri: 'ws://localhost:4000/graphql',
      options: {
        lazy: true,
        reconnect: true,
      },
    })
  : null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError)
    console.log(
      `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
    );
});

const httpLink = (fetch: any) =>
  createUploadLink({
    uri: 'http://localhost:4000/graphql',
    fetchOptions: {
      mode: 'cors',
    },
    credentials: 'include',
    fetch,
  });

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response);
  };

  return new ApolloClient({
    ssrMode,
    link: ApolloLink.from(
      process.browser
        ? [
            errorLink,
            split(
              ({ query }) => {
                const { kind, operation } = getMainDefinition(query) as any;
                return (
                  kind === 'OperationDefinition' && operation === 'subscription'
                );
              },
              wsLink,
              httpLink(enhancedFetch),
            ),
          ]
        : [errorLink, httpLink(enhancedFetch)],
    ),

    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getAllPosts: {
              keyArgs: [],
              merge: (
                existing = { __typename: 'PostReturnDto', posts: [], total: 0 },
                incoming,
                { variables },
              ) => {
                if (variables?.isFetchMore) {
                  return {
                    posts: [...existing.posts, ...incoming.posts],
                    total: incoming.total,
                  };
                }
                return incoming;
              },
            },
          },
        },
      },
    }),
  });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  },
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state],
  );
  return store;
}
