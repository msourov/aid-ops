import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import { tagTypes } from "./tags";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: baseQuery,
  tagTypes: [tagTypes.INVENTORY],
  endpoints: (builder) => ({
    getInventoryData: builder.query({
      query: () => "inventory",
      transformResponse: (response) => {
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Inventory",
                id,
              })),
              { type: "Inventory", id: "LIST" },
            ]
          : [{ type: "Inventory", id: "LIST" }],
    }),
    getTotalExpenses: builder.query({
      query: () => "inventory/total-expense",
      providesTags: [{ type: "Inventory", id: "TOTAL_EXPENSE" }],
    }),
    getDailyDonationExpense: builder.query({
      query: () => "inventory/daily-donation-expense",
      providesTags: [{ type: "Inventory", id: "DAILY_DONATION_EXPENSE" }],
    }),
    addToInventory: builder.mutation({
      query: (data) => ({
        url: "inventory/create",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { token } = await queryFulfilled;
          console.log("Item added to inventory:", token);
        } catch (error) {
          console.error("Error adding item to inventory:", error);
        }
      },
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),
  }),
});

export const {
  useGetInventoryDataQuery,
  useGetTotalExpensesQuery,
  useGetDailyDonationExpenseQuery,
  useAddToInventoryMutation,
} = inventoryApi;
