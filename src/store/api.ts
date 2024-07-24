import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { showErrorToast } from 'src/shared/utils/utility-functions';

const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}`,
  prepareHeaders: (headers) => {
    return headers;
  }
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    showErrorToast('Something went wrong');
  }
  return result;
};

export const api = createApi({
  reducerPath: 'clientApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['AWS'],
  endpoints: () => ({})
});
