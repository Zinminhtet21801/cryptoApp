import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsHeaders = {
  "x-bingapis-sdk": process.env.REACT_APP_NEWS_SDK,
  "x-rapidapi-host": process.env.REACT_APP_NEWS_HOST,
  "x-rapidapi-key": process.env.REACT_APP_NEWS_KEY,
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
