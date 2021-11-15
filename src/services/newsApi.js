import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "40fc5b3a25msh35f9c5f4e64228ep12d396jsn388c747b1ee4",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: newsHeaders });
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=OFF`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = newsApi;
