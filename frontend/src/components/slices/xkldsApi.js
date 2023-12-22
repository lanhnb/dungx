// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../api";

// Define a service using a base URL and expected endpoints
export const xkldsApi = createApi({
  reducerPath: "xkldsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
  endpoints: (builder) => ({
    getAllXklds: builder.query({
      query: () => "xklds",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllXkldsQuery } = xkldsApi;
