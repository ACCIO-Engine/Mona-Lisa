import { BASE_URL } from "./api";

export const searchImage = async (query: string) => {
  return fetch(
    `${BASE_URL}/search-image?query=${encodeURIComponent(
      query
    )}&engine=tfidf`
  ).then((res) => res.json());
};
