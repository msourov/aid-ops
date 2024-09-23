import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import { tagTypes } from "./tags";

export const crisisApi = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery,
  tagTypes: [tagTypes.CRISIS],
  endpoints: (builder) => ({
    getCrises: builder.query({
      query: () => ({
        url: "crisis",
        method: "GET",
      }),
      providesTags: [{ type: "Crisis", id: "LIST" }],
    }),
    getCrisisDetail: builder.query({
      query: (id) => ({
        url: `crisis/${id}`,
        method: "GET",
      }),
      providesTags: (result, _error, { id }) => [{ type: "Crisis", id }],
    }),
    createCrisis: builder.mutation({
      query: (data) => ({
        url: "crisis/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Crisis", id: "LIST" }],
    }),
    approveCrisis: builder.mutation({
      query: (id) => ({
        url: `crisis/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Crisis", id }],
    }),
    rejectCrisis: builder.mutation({
      query: (id) => ({
        url: `crisis/${id}/reject`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Crisis", id }],
    }),
  }),
});

export const {
  useGetCrisesQuery,
  useGetCrisisDetailQuery,
  useCreateCrisisMutation,
  useApproveCrisisMutation,
  useRejectCrisisMutation,
} = crisisApi;
