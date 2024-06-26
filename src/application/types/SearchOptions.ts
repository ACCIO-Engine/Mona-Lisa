interface FileTypes {
  Image: boolean;
  Text: boolean;
  Video: boolean;
  Audio: boolean;
}

interface FileSizes {
  Empty: boolean;
  Tiny: boolean;
  Small: boolean;
  Medium: boolean;
  Large: boolean;
  Huge: boolean;
  Gigantic: boolean;
}

export type { FileTypes, FileSizes };
