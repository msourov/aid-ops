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
        url: "crises",
        method: "GET",
      }),
      providesTags: [{ type: "Crisis", id: "LIST" }],
    }),
    getCrisisDetail: builder.query({
      query: (id) => ({
        url: `crises/${id}`,
        method: "GET",
      }),
      providesTags: (result, _error, { id }) => [{ type: "Crisis", id }],
    }),
    createCrisis: builder.mutation({
      query: (data) => ({
        url: "crises/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Crisis", id: "LIST" }],
    }),
    approveCrisis: builder.mutation({
      query: (id) => ({
        url: `crises/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Crisis", id }],
    }),
    rejectCrisis: builder.mutation({
      query: (id) => ({
        url: `crises/${id}/reject`,
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
