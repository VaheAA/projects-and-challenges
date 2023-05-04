import { createApi } from "@reduxjs/toolkit/query/react";
import { defaultBaseQuery } from "./init/utils";

// initialize an base api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: defaultBaseQuery,
  endpoints: () => ({})
});