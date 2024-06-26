import { QueryEngines, SearchType } from "../../application";
import { BASE_URL } from "../api/api";

interface SearchParams {
  query: string;
  queryEngine: QueryEngines;
  searchType: SearchType;
  pageSize?: number;
  page?: number;
  fileSizes?: string[];
  fileTypes?: string[];
  modifiedTimeStart?: Date;
  modifiedTimeEnd?: Date;
}

export const search = async ({
                               query,
                               queryEngine,
                               searchType,
                               fileTypes = [],
                               pageSize = 10,
                               page = 0,
                               fileSizes = [],
                               modifiedTimeStart,
                               modifiedTimeEnd
                             }: SearchParams) => {
  const params = new URLSearchParams({
    query,
    engine: queryEngine,
    searchType,
    pageSize: pageSize.toString(),
    page: page.toString()
  });
  fileTypes.forEach((type) => params.append("fileTypes", type));
  fileSizes.forEach((size) => params.append("fileSizes", size));


  if (modifiedTimeStart) {
    params.append("modifiedTimeStart", modifiedTimeStart.toISOString());
  }
  if (modifiedTimeEnd) {
    params.append("modifiedTimeEnd", modifiedTimeEnd.toISOString());
  }

  const url = `${BASE_URL}/search?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};
