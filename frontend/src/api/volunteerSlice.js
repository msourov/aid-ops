import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import { tagTypes } from "./tags";

export const volunteerApi = createApi({
  reducerPath: "volunteerApi",
  baseQuery: baseQuery,
  tagTypes: [tagTypes.VOLUNTEER],

  endpoints: (builder) => ({
    getAvailableVolunteers: builder.query({
      query: () => "user/available-volunteers",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ user_id }) => ({
                type: "Volunteer",
                id: user_id,
              })),
              { type: "Volunteer", id: "LIST" },
            ]
          : [{ type: "Volunteer", id: "LIST" }],
    }),
    getAllVolunteers: builder.query({
      query: () => "user/all-volunteers",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ user_id }) => ({
                type: "Volunteer",
                id: user_id,
              })),
              { type: "Volunteer", id: "LIST" },
            ]
          : [{ type: "Volunteer", id: "LIST" }],
    }),
  }),
});

export const { useGetAvailableVolunteersQuery, useGetAllVolunteersQuery } =
  volunteerApi;
