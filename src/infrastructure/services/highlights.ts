import { BASE_URL } from "../api/api.ts";
import { QueryEngines } from "../../application";

export async function getHighlights(query: string, path: string, queryEngine: QueryEngines) {
  const params = new URLSearchParams({
    query,
    path,
    engine: queryEngine
  });

  const url = `${BASE_URL}/fileHighlights?${params.toString()}`;

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
}