import FileType from "../types/FileType.enum";

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mkv",
  ".flv",
  ".avi",
  ".mov",
  ".wmv",
  ".webm",
  ".mpeg",
  ".3gp",
  ".ogv"
];

export default function getFileType(filePath: string): FileType | undefined {
  const fileExtension = filePath.split(".").pop()?.toLowerCase();
  if (fileExtension) {
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return FileType.Image;
    } else if (fileExtension === "pdf") {
      return FileType.PDF;
    } else if (["doc", "docx"].includes(fileExtension)) {
      return FileType.Word;
    } else if (["ppt", "pptx"].includes(fileExtension)) {
      return FileType.PowerPoint;
    } else if (["txt"].includes(fileExtension)) {
      return FileType.Text;
    } else if (VIDEO_EXTENSIONS.includes(`.${fileExtension}`)) {
      return FileType.Video;
    }
  }
  return undefined; // File type not supported or file path is invalid
}
