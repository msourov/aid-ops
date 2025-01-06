import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "../utils/getToken";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.BASE_API || "https://aid-ops.onrender.com/api/v1/",
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
