import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://slim-mom-backend-team-project-ik9a.onrender.com/api',
    baseUrl: 'https://slim-mom-api.onrender.com/api/',
    // baseUrl: 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: user => ({
        url: `/users/signup`,
        method: 'POST',
        body: user,
      }),
    }),

    logInUser: builder.mutation({
      query: user => ({
        url: `/users/signin`,
        method: 'POST',
        body: user,
      }),
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
      headers: {
        authorization: '',
      },
    }),

    getUser: builder.query({
      query: a => `/users/current${a}`,
    }),

    updateGoogleUser: builder.mutation({
      query: user => ({
        url: `/auth/update/user`,
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
  useGetUserQuery,
  useUpdateGoogleUserMutation,
} = authApi;
