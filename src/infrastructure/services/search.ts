import { QueryEngines, SearchType } from "../../application";
import { BASE_URL } from "../api/api";

export const search = async (
  query: string,
  queryEngine: QueryEngines,
  searchType: SearchType
) => {
  return fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}&engine=${queryEngine}&searchType=${searchType}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
};
