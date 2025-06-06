/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
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
  UseQueryResult
} from '@tanstack/react-query';

import axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import type {
  AuthRequest,
  AuthResponse,
  GetCurrentUser200,
  GoogleLoginResponse
} from '.././schemas';





export const register = (
    authRequest: AuthRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<AuthResponse>> => {
    
    
    return axios.post(
      `https://api.hackathon-fiipractic.octavianregatun.com/auth/register`,
      authRequest,options
    );
  }



export const getRegisterMutationOptions = <TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof register>>, TError,{data: AuthRequest}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof register>>, TError,{data: AuthRequest}, TContext> => {

const mutationKey = ['register'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof register>>, {data: AuthRequest}> = (props) => {
          const {data} = props ?? {};

          return  register(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type RegisterMutationResult = NonNullable<Awaited<ReturnType<typeof register>>>
    export type RegisterMutationBody = AuthRequest
    export type RegisterMutationError = AxiosError<unknown>

    export const useRegister = <TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof register>>, TError,{data: AuthRequest}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof register>>,
        TError,
        {data: AuthRequest},
        TContext
      > => {

      const mutationOptions = getRegisterMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    export const login = (
    authRequest: AuthRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<AuthResponse>> => {
    
    
    return axios.post(
      `https://api.hackathon-fiipractic.octavianregatun.com/auth/login`,
      authRequest,options
    );
  }



export const getLoginMutationOptions = <TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof login>>, TError,{data: AuthRequest}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof login>>, TError,{data: AuthRequest}, TContext> => {

const mutationKey = ['login'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof login>>, {data: AuthRequest}> = (props) => {
          const {data} = props ?? {};

          return  login(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>
    export type LoginMutationBody = AuthRequest
    export type LoginMutationError = AxiosError<unknown>

    export const useLogin = <TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof login>>, TError,{data: AuthRequest}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof login>>,
        TError,
        {data: AuthRequest},
        TContext
      > => {

      const mutationOptions = getLoginMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    export const getCurrentUser = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetCurrentUser200>> => {
    
    
    return axios.get(
      `https://api.hackathon-fiipractic.octavianregatun.com/auth/me`,options
    );
  }


export const getGetCurrentUserQueryKey = () => {
    return [`https://api.hackathon-fiipractic.octavianregatun.com/auth/me`] as const;
    }

    
export const getGetCurrentUserQueryOptions = <TData = Awaited<ReturnType<typeof getCurrentUser>>, TError = AxiosError<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCurrentUserQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCurrentUser>>> = ({ signal }) => getCurrentUser({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetCurrentUserQueryResult = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
export type GetCurrentUserQueryError = AxiosError<unknown>


export function useGetCurrentUser<TData = Awaited<ReturnType<typeof getCurrentUser>>, TError = AxiosError<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCurrentUser>>,
          TError,
          Awaited<ReturnType<typeof getCurrentUser>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetCurrentUser<TData = Awaited<ReturnType<typeof getCurrentUser>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCurrentUser>>,
          TError,
          Awaited<ReturnType<typeof getCurrentUser>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetCurrentUser<TData = Awaited<ReturnType<typeof getCurrentUser>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetCurrentUser<TData = Awaited<ReturnType<typeof getCurrentUser>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetCurrentUserQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const googleLogin = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GoogleLoginResponse>> => {
    
    
    return axios.get(
      `https://api.hackathon-fiipractic.octavianregatun.com/auth/google`,options
    );
  }


export const getGoogleLoginQueryKey = () => {
    return [`https://api.hackathon-fiipractic.octavianregatun.com/auth/google`] as const;
    }

    
export const getGoogleLoginQueryOptions = <TData = Awaited<ReturnType<typeof googleLogin>>, TError = AxiosError<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGoogleLoginQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof googleLogin>>> = ({ signal }) => googleLogin({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GoogleLoginQueryResult = NonNullable<Awaited<ReturnType<typeof googleLogin>>>
export type GoogleLoginQueryError = AxiosError<unknown>


export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = AxiosError<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof googleLogin>>,
          TError,
          Awaited<ReturnType<typeof googleLogin>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof googleLogin>>,
          TError,
          Awaited<ReturnType<typeof googleLogin>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGoogleLogin<TData = Awaited<ReturnType<typeof googleLogin>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof googleLogin>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGoogleLoginQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



