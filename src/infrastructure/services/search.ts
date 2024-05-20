import { QueryEngines, SearchType } from "../../application";
import { BASE_URL } from "../api/api";

// Define the types for the optional parameters
type FileSizes = "SMALL" | "MEDIUM" | "LARGE"; // Replace with actual file size types

interface SearchParams {
  query: string;
  queryEngine: QueryEngines;
  searchType: SearchType;
  pageSize?: number;
  page?: number;
  fileSizes?: FileSizes[];
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
    query: encodeURIComponent(query),
    engine: queryEngine,
    searchType,
    pageSize: pageSize.toString(),
    page: page.toString()
  });
  
  // fileSizes.forEach((size) => params.append("fileSizes", size));
  fileTypes.forEach((type) => params.append("fileTypes", type));

  // if (modifiedTimeStart) {
  //   params.append("modifiedTimeStart", modifiedTimeStart.toISOString());
  // }
  // if (modifiedTimeEnd) {
  //   params.append("modifiedTimeEnd", modifiedTimeEnd.toISOString());
  // }

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
