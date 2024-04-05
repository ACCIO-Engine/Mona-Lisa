export default function getFileNameFromPath(path: string): string {
  return path.split("/").pop() as string;
}
