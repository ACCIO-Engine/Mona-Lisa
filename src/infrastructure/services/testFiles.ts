import { BASE_URL } from "../api/api";

interface Params {
  path: string;
  type: string;
}

export const testFile = async ({ path, type }: Params) => {
  const params = new URLSearchParams({
    path
  });
  const url = `${BASE_URL}/${type}?${params.toString()}`;

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
