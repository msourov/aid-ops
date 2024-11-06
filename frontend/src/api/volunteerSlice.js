import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import { tagTypes } from "./tags";

export const volunteerApi = createApi({
  reducerPath: "volunteerApi",
  baseQuery: baseQuery,
  tagTypes: [tagTypes.VOLUNTEER],

  endpoints: (builder) => ({
    getAllVolunteers: builder.query({
      query: ({ limit, offset }) =>
        `users/all-volunteers?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ user_id }) => ({
                type: "Volunteer",
                id: user_id,
              })),
              { type: "Volunteer", id: "LIST" },
            ]
          : [{ type: "Volunteer", id: "LIST" }],
    }),
    getAvailableVolunteers: builder.query({
      query: ({ limit, offset }) =>
        `users/available-volunteers?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ user_id }) => ({
                type: "Volunteer",
                id: user_id,
              })),
              { type: "Volunteer", id: "LIST" },
            ]
          : [{ type: "Volunteer", id: "LIST" }],
    }),
    getVolunteerOptions: builder.query({
      query: () => "users/volunteer-options",
      providesTags: [{ type: "Volunteer", id: "OPTIONS" }],
    }),
  }),
});

export const {
  useGetAvailableVolunteersQuery,
  useGetAllVolunteersQuery,
  useGetVolunteerOptionsQuery,
} = volunteerApi;
