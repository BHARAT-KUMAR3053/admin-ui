import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getList: build.query<IResponse[], void>({
      query: () => ({
        url: ''
      }),
      providesTags: ['AWS']
    })
  })
});

export const { useGetListQuery } = authApi;
