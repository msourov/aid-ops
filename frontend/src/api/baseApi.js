import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "../utils/getToken";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.BASE_API || "http://localhost:8080/api/",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export default baseQuery;
