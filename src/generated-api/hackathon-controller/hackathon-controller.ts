/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import type { HackathonRequest, HackathonResponse } from ".././schemas";

export const createHackathon = (
  hackathonRequest: HackathonRequest,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<HackathonResponse>> => {
  return axios.post(
    `https://api.hackathon-fiipractic.octavianregatun.com/hackathons/create`,
    hackathonRequest,
    options
  );
};

export const getCreateHackathonMutationOptions = <
  TError = AxiosError<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createHackathon>>,
    TError,
    { data: HackathonRequest },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createHackathon>>,
  TError,
  { data: HackathonRequest },
  TContext
> => {
  const mutationKey = ["createHackathon"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createHackathon>>,
    { data: HackathonRequest }
  > = (props) => {
    const { data } = props ?? {};

    return createHackathon(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateHackathonMutationResult = NonNullable<
  Awaited<ReturnType<typeof createHackathon>>
>;
export type CreateHackathonMutationBody = HackathonRequest;
export type CreateHackathonMutationError = AxiosError<unknown>;

export const useCreateHackathon = <
  TError = AxiosError<unknown>,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createHackathon>>,
      TError,
      { data: HackathonRequest },
      TContext
    >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof createHackathon>>,
  TError,
  { data: HackathonRequest },
  TContext
> => {
  const mutationOptions = getCreateHackathonMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
export const getAll = (
  options?: AxiosRequestConfig
): Promise<AxiosResponse<HackathonResponse[]>> => {
  return axios.get(
    `https://api.hackathon-fiipractic.octavianregatun.com/hackathons`,
    options
  );
};

export const getGetAllQueryKey = () => {
  return [
    `https://api.hackathon-fiipractic.octavianregatun.com/hackathons`,
  ] as const;
};

export const getGetAllQueryOptions = <
  TData = Awaited<ReturnType<typeof getAll>>,
  TError = AxiosError<unknown>
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getAll>>, TError, TData>
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAll>>> = ({
    signal,
  }) => getAll({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getAll>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetAllQueryResult = NonNullable<Awaited<ReturnType<typeof getAll>>>;
export type GetAllQueryError = AxiosError<unknown>;

export function useGetAll<
  TData = Awaited<ReturnType<typeof getAll>>,
  TError = AxiosError<unknown>
>(
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getAll>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAll>>,
          TError,
          Awaited<ReturnType<typeof getAll>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetAll<
  TData = Awaited<ReturnType<typeof getAll>>,
  TError = AxiosError<unknown>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getAll>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAll>>,
          TError,
          Awaited<ReturnType<typeof getAll>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetAll<
  TData = Awaited<ReturnType<typeof getAll>>,
  TError = AxiosError<unknown>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getAll>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};

export function useGetAll<
  TData = Awaited<ReturnType<typeof getAll>>,
  TError = AxiosError<unknown>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getAll>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetAllQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getById = (
  id: number,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<HackathonResponse>> => {
  return axios.get(
    `https://api.hackathon-fiipractic.octavianregatun.com/hackathons/${id}`,
    options
  );
};

export const getGetByIdQueryKey = (id: number) => {
  return [
    `https://api.hackathon-fiipractic.octavianregatun.com/hackathons/${id}`,
  ] as const;
};

export const getGetByIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getById>>,
  TError = AxiosError<unknown>
>(
  id: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getById>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  }
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetByIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getById>>> = ({
    signal,
  }) => getById(id, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof getById>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type GetByIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getById>>
>;
export type GetByIdQueryError = AxiosError<unknown>;

export function useGetById<
  TData = Awaited<ReturnType<typeof getById>>,
  TError = AxiosError<unknown>
>(
  id: number,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getById>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getById>>,
          TError,
          Awaited<ReturnType<typeof getById>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetById<
  TData = Awaited<ReturnType<typeof getById>>,
  TError = AxiosError<unknown>
>(
  id: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getById>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getById>>,
          TError,
          Awaited<ReturnType<typeof getById>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetById<
  TData = Awaited<ReturnType<typeof getById>>,
  TError = AxiosError<unknown>
>(
  id: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getById>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};

export function useGetById<
  TData = Awaited<ReturnType<typeof getById>>,
  TError = AxiosError<unknown>
>(
  id: number,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getById>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetByIdQueryOptions(id, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getMyHackathons = (
  options?: AxiosRequestConfig
): Promise<AxiosResponse<HackathonResponse[]>> => {
  return axios.get(
    `https://api.hackathon-fiipractic.octavianregatun.com/hackathons/my`,
    options
  );
};

export const getGetMyHackathonsQueryKey = () => {
  return [
    `https://api.hackathon-fiipractic.octavianregatun.com/hackathons/my`,
  ] as const;
};

export const getGetMyHackathonsQueryOptions = <
  TData = Awaited<ReturnType<typeof getMyHackathons>>,
  TError = AxiosError<unknown>
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getMyHackathons>>, TError, TData>
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetMyHackathonsQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMyHackathons>>> = ({
    signal,
  }) => getMyHackathons({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getMyHackathons>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetMyHackathonsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getMyHackathons>>
>;
export type GetMyHackathonsQueryError = AxiosError<unknown>;

export function useGetMyHackathons<
  TData = Awaited<ReturnType<typeof getMyHackathons>>,
  TError = AxiosError<unknown>
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getMyHackathons>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyHackathons>>,
          TError,
          Awaited<ReturnType<typeof getMyHackathons>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetMyHackathons<
  TData = Awaited<ReturnType<typeof getMyHackathons>>,
  TError = AxiosError<unknown>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getMyHackathons>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMyHackathons>>,
          TError,
          Awaited<ReturnType<typeof getMyHackathons>>
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetMyHackathons<
  TData = Awaited<ReturnType<typeof getMyHackathons>>,
  TError = AxiosError<unknown>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getMyHackathons>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};

export function useGetMyHackathons<
  TData = Awaited<ReturnType<typeof getMyHackathons>>,
  TError = AxiosError<unknown>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getMyHackathons>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetMyHackathonsQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}
