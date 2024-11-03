import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import { tagTypes } from "./tags";
import { setToken } from "../utils/getToken";

export const userApi = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery,
  tagTypes: [tagTypes.USER],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { token } = await queryFulfilled;
          console.log("Login Response:", token);
          setToken(token);
        } catch (error) {
          console.error("Error during login:", error);
        }
      },
    }),
    getUsers: builder.query({
      query: () => "users",
      transformResponse: (response) => {
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "User",
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUserDetail: builder.query({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: (result, _error, { id }) => [{ type: "User", id }],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "auth/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserDetailQuery,
  useCreateUserMutation,
} = userApi;
