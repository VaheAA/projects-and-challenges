import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const defaultBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT,PATCH, DELETE, OPTIONS"
    );
    headers.set('X-RapidAPI-Key', import.meta.env.VITE_API_KEY,
    );
    headers.set('X-RapidAPI-Host', import.meta.env.VITE_API_HOST);
    return headers;
  }
});