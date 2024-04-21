import FileType from "./FileType.enum";

export default interface File {
  path: string;
  name: string;
  score: number;
  pages: number[];
  type: FileType | undefined;
}
