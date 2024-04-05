import { BASE_URL } from "../api/api";

export const searchImage = async (query: string) => {
  return fetch(
    `${BASE_URL}/search-image?query=${encodeURIComponent(query)}&engine=tfidf`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
};
