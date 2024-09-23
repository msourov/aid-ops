import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";

export const financialApi = createApi({
  reducerPath: "financialApi",
  baseQuery: baseQuery,

  endpoints: (builder) => ({
    getFinancialData: builder.query({
      query: () => ({
        url: "financials",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFinancialDataQuery } = financialApi;
