import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import { tagTypes } from "./tags";

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery: baseQuery,
  tagTypes: [tagTypes.DONATION],

  endpoints: (builder) => ({
    getAllDonations: builder.query({
      query: ({ limit, offset }) => ({
        url: `donations/all?limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Donation",
                id,
              })),
              { type: "Donation", id: "LIST" },
            ]
          : [{ type: "Donation", id: "LIST" }],
    }),
    getTotalDonation: builder.query({
      query: () => ({
        url: "donations/total",
        method: "GET",
      }),
      providesTags: [{ type: "Donation", id: "LIST" }],
    }),
    getMonthlyDonationExpense: builder.query({
      query: () => ({
        url: "inventory/daily-donation-expense",
        method: "GET",
      }),
      providesTags: [{ type: "Donation", id: "LIST" }],
    }),
    createDonation: builder.mutation({
      query: (data) => ({
        url: "donations/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Donation", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllDonationsQuery,
  useGetTotalDonationQuery,
  useGetMonthlyDonationExpenseQuery,
  useCreateDonationMutation,
} = donationApi;
