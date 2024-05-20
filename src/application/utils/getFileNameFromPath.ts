import { getOS } from "./getOS";

export default function getFileNameFromPath(path: string): string {
  if (getOS() === "windows") {
    return path.split("\\").pop() as string;
  } else {
    return path.split("/").pop() as string;
  }
}
